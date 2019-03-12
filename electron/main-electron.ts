import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

import { Config } from './config';

const configFileName = 'config.json';

let win: BrowserWindow | null = null;

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

//#region IPC

ipcMain.on('redis-cmd', (_: IpcMessageEvent, cmd: string) => {
    console.log(`TODO: exec redis command '${cmd}'`);
});

//#endregion
