import { Injectable } from '@angular/core';
import { IpcMessageEvent } from 'electron';
import { ElectronService } from 'ngx-electron';

import { LogService } from './log.service';
import * as commands from '../../electron/commands';
import * as notifications from '../../electron/notifications';

@Injectable({
  providedIn: 'root'
})
export class RedisService {

  //#region Lifecycle

  constructor(private electron: ElectronService,
    private log: LogService) {
    this.electron.ipcRenderer.on(notifications.RedisConnect, (_: IpcMessageEvent, connection: string, status: notifications.RedisConnectStatus) => {
      this.log.appendLog(`${connection}> connect ${status}`);
    });

    this.electron.ipcRenderer.on(notifications.RedisDisconnect, (_: IpcMessageEvent, connection: string) => {
      this.log.appendLog(`${connection}> disconnect`);
    });

    this.electron.ipcRenderer.on(notifications.RedisResponse, (_: IpcMessageEvent, connection: string, response: any) => {
      this.log.appendLog(`${connection}> [Resp] ${response}`);
    });
  }

  //#endregion

  connect(connection: string) {
    this.electron.ipcRenderer.send(commands.RedisConnect, connection);
  }

  disconnect(connection: string) {
    this.electron.ipcRenderer.send(commands.RedisDisconnect, connection);
  }

  exec(connection: string, cmd: string) {
    this.log.appendLog(`${connection}> [Cmd] ${cmd}`);
    this.electron.ipcRenderer.send(commands.RedisCommand, connection, cmd);
  }
}
