import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as redis from 'redis';

import { Config, RedisServerConfig } from './config';
import * as commands from './commands';
import * as notifications from './notifications';

const configPath = path.join(app.getPath('userData'), 'config.json');
let reloadWait = false;

let win: BrowserWindow | null = null;

//#region Config

function addFileWatcher(filename: fs.PathLike, listener?: ((event: string, filename: string) => void) | undefined) {
    console.log(`Watching file '${filename}'...`);
    fs.watch(filename, listener);
}

function reloadConfig() {
    if (reloadWait) {
        return;
    }

    reloadWait = true;
    setTimeout(() => {
        reloadWait = false;
    }, 100);

    disconnectRedisAll(true);

    console.log(`Reloading config '${configPath}'...`);
    const rawConfig = fs.readFileSync(configPath);
    global.config = Object.assign(new Config(), JSON.parse(rawConfig.toString()));

    win!.webContents.send(notifications.ConfigReload);
}

function loadConfig() {
    // ensure the config file exists
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, '{}');
    }

    console.log(`Loading config from '${configPath}'...`);

    // load it
    const rawConfig = fs.readFileSync(configPath);
    global.config = Object.assign(new Config(), JSON.parse(rawConfig.toString()));

    // watch it
    addFileWatcher(configPath, reloadConfig);
}

//#endregion

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.on('closed', () => {
        win = null;
    });

    // load the dist folder from Angular
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, '/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    if (!app.isPackaged) {
        win.webContents.openDevTools();
    }
}

app.on('ready', () => {
    global.redisConnections = new Map<string, redis.RedisClient>();

    loadConfig();
    createWindow();
});

app.on('window-all-closed', () => {
    // on OSX it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // on OSX it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

/*
TODO: this architecture sucks right now
we want to have this module hold the redis connections so they get garbage collected,
but we probably want to hand them off directly to the UI for commands.
passing the commands through IPC is never really going to work out cleanly
*/

//#region IPC

ipcMain.on(commands.RedisConfigAdd, (_: IpcMessageEvent, config: RedisServerConfig) => {
    disconnectRedis(config.name, true);

    global.config.redisConfig.push(config);

    // TODO: use reloadWait to avoid reloading this after we save?
    console.log(`Saving config '${configPath}'...`);
    fs.writeFileSync(configPath, JSON.stringify(global.config));

    win!.webContents.send(notifications.RedisConnectionAdded, config.name);
});

ipcMain.on(commands.RedisConfigRemove, (_: IpcMessageEvent, connection: string) => {
    disconnectRedis(connection, true);

    for (let i = 0; i < global.config.redisConfig.length; i++) {
        if (global.config.redisConfig[i].name === connection) {
            global.config.redisConfig.splice(i, 1);
            break;
        }
    }

    // TODO: use reloadWait to avoid reloading this after we save?
    console.log(`Reloading config '${configPath}'...`);
    fs.writeFileSync(configPath, JSON.stringify(global.config));

    win!.webContents.send(notifications.RedisConnectionRemoved, connection);
});

ipcMain.on(commands.RedisConnect, (_: IpcMessageEvent, connection: string) => {
    connectRedis(connection);
});

ipcMain.on(commands.RedisDisconnect, (_: IpcMessageEvent, connection: string) => {
    disconnectRedis(connection, false);
});

ipcMain.on(commands.RedisCommand, (_: IpcMessageEvent, connection: string, cmd: string) => {
    if (!global.redisConnections.has(connection)) {
        if (!connectRedis(connection)) {
            return;
        }
    }

    const client = global.redisConnections.get(connection);
    if (!client) {
        console.warn(`Redis connection '${connection}' not connected!`);
        return;
    }

    client.send_command(cmd, [], (_: redis.RedisError | null, reply: any) => {
        win!.webContents.send(notifications.RedisResponse, connection, reply);
    });
});

//#endregion

//#region Redis

// https://www.npmjs.com/package/redis

function connectRedis(connection: string) {
    disconnectRedis(connection, true);

    const config = global.config.redisConfig.find(redisConfig => {
        return redisConfig.name === connection;
    });

    if (!config) {
        console.warn(`No such redis connection ${connection}!`);

        win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.ConnectFailed);
        return false;
    }

    connectRedisConfig(connection, config);

    return true;
}

function connectRedisConfig(connection: string, config: RedisServerConfig) {
    console.log(`Connecting redis connection ${config.name} (${config.host}:${config.port})...`);

    win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.Connecting);

    const client = redis.createClient(config.port, config.host, {
        //password: config.password,

        // TODO: setting this seems to not emit the error event ?
        retry_strategy: (options) => {
            if (options.error && options.error.code === 'ECONNREFUSED') {
                win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.ConnectFailed, 'Connection refused');
                return options.error;
            }

            // give up :shrug:
            if (options.attempt > 10) {
                win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.ConnectFailed, 'Max retries attempted');
                return new Error('Max retries attempted');
            }

            const retryms = Math.min(options.attempt * 100, 3000);
            console.warn(`Connection attempt ${options.attempt} failed, retrying in ${retryms}...`);
            return retryms;
        }
    });

    // TODO: we should also store pending connections so that we don't have multiples in-flight

    client.on('warning', (warn) => {
        console.warn(`Redis Warning (${connection}): ${warn}`);
    });

    client.on('error', (err) => {
        console.error(`Redis Error (${connection}): ${err}`);
        client.quit();
    });

    client.on('ready', () => {
        global.redisConnections.set(config.name, client);

        win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.ConnectSuccess);
    });
}

function disconnectRedis(connection: string, notify: boolean) {
    const client = global.redisConnections.get(connection);
    if (!client) {
        return;
    }

    client.quit();
    global.redisConnections.delete(connection);

    if (notify) {
        win!.webContents.send(notifications.RedisDisconnect, connection);
    }
}

function disconnectRedisAll(notify: boolean) {
    const connections = Array.from(global.redisConnections.keys());
    for (const connection of Object.keys(connections)) {
        disconnectRedis(connection, notify);
    }
}

//#endregion
