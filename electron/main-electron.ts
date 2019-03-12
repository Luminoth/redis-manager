import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as redis from 'redis';

import { Config } from './config';
import * as commands from './commands';
import * as notifications from './notifications';

const configFileName = 'config.json';

let win: BrowserWindow | null = null;
let redisConnections: Map<string, redis.RedisClient> = new Map<string, redis.RedisClient>();

//#region Config

function addFileWatcher(filename: fs.PathLike, listener?: ((event: string, filename: string) => void) | undefined) {
    console.log(`Watching file '${filename}'...`);
    fs.watch(filename, listener);
}

function loadConfig() {
    const configPath = path.join(app.getPath('userData'), configFileName);

    // ensure the config file exists
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, '{}');
    }

    console.log(`Loading config from '${configPath}'...`);

    // load it
    const rawConfig = fs.readFileSync(configPath);
    global.config = Object.assign(new Config(), JSON.parse(rawConfig.toString()));

    // watch it
    let reloadWait = false;
    addFileWatcher(configPath, (_, filename) => {
        if (reloadWait) {
            return;
        }

        reloadWait = true;
        setTimeout(() => {
            reloadWait = false;
        }, 100);

        console.log(`Reloading config '${filename}'...`);
        const rawConfig = fs.readFileSync(configPath);
        global.config = Object.assign(new Config(), JSON.parse(rawConfig.toString()));
    });
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

ipcMain.on(commands.RedisConfigUpdate, (_: IpcMessageEvent, connection: string) => {
    disconnectRedis(connection, true);
});

ipcMain.on(commands.RedisConfigRemove, (_: IpcMessageEvent, connection: string) => {
    disconnectRedis(connection, true);
});

ipcMain.on(commands.RedisConnect, (_: IpcMessageEvent, connection: string) => {
    connectRedis(connection);
});

ipcMain.on(commands.RedisDisconnect, (_: IpcMessageEvent, connection: string) => {
    disconnectRedis(connection, false);
});

ipcMain.on(commands.RedisCommand, (_: IpcMessageEvent, connection: string, cmd: string) => {
    if (!redisConnections.has(connection)) {
        if (!connectRedis(connection)) {
            return;
        }
    }

    const client = redisConnections.get(connection);
    if (!client) {
        console.warn(`Redis connection '${connection}' not connected!`);
        return;
    }

    client.send_command(cmd, [], (err: redis.RedisError | null, reply: any) => {
        win!.webContents.send(notifications.RedisResponse, connection, reply);
    });
});

//#endregion

//#region Redis

function connectRedis(connection: string) {
    disconnectRedis(connection, true);

    const config = global.config.redisConfig.find(config => {
        return config.name == connection;
    });

    if (!config) {
        console.warn(`No such redis connection ${connection}!`);

        win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.ConnectFailed);
        return false;
    }

    win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.Connecting);

    const client = redis.createClient(config.port, config.host);
    // TODO: error handling

    // TODO: auth (send ConnectAuth status)

    redisConnections.set(config.name, client);

    win!.webContents.send(notifications.RedisConnect, connection, notifications.RedisConnectStatus.ConnectSuccess);

    return true;
}

function disconnectRedis(connection: string, notify: boolean) {
    const client = redisConnections.get(connection);
    if (!client) {
        return;
    }

    client.quit();
    redisConnections.delete(connection);

    if (notify) {
        win!.webContents.send(notifications.RedisDisconnect, connection);
    }
}

//#endregion
