import { NgZone, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IpcRendererEvent } from 'electron';
import { ElectronService } from 'ngx-electron';

import { LogService } from './log.service';
import * as commands from '../../electron/commands';
import * as notifications from '../../electron/notifications';

export interface RedisTestConnectStatus {
  host: string;
  port: number;
  status: notifications.RedisConnectStatus;
}

export interface RedisConnectStatus {
  connection: string;
  status: notifications.RedisConnectStatus;
}

export interface RedisResponse {
  connection: string;
  response: any;
}

@Injectable({
  providedIn: 'root'
})
export class RedisService {

  private _redisTestConnectStatusSource = new Subject<RedisTestConnectStatus>();
  private _redisConnectStatusSource = new Subject<RedisConnectStatus>();
  private _redisDisconnectSource = new Subject<string>();
  private _redisResponseSource = new Subject<RedisResponse>();

  //#region Streams

  redisTestConnectStatus$ = this._redisTestConnectStatusSource.asObservable();
  redisConnectStatus$ = this._redisConnectStatusSource.asObservable();
  redisDisconnect$ = this._redisDisconnectSource.asObservable();
  redisResponse$ = this._redisResponseSource.asObservable();

  //#endregion

  //#region Lifecycle

  constructor(private electron: ElectronService,
    private log: LogService,
    private zone: NgZone) {
    // electron callbacks need to run through NgZone so they run in the Angular zone

    this.electron.ipcRenderer.on(notifications.RedisTestConnect, (_: IpcRendererEvent, host: string, port: number, status: notifications.RedisConnectStatus) => {
      this.zone.run(() => {
        this.log.appendLog(`${host}:${port}> test connect '${status}'`);

        this._redisTestConnectStatusSource.next({
          host: host,
          port: port,
          status: status
        });
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisConnect, (_: IpcRendererEvent, connection: string, status: notifications.RedisConnectStatus) => {
      this.zone.run(() => {
        this.log.appendLog(`${connection}> connect '${status}'`);

        this._redisConnectStatusSource.next({
          connection: connection,
          status: status
        });
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisDisconnect, (_: IpcRendererEvent, connection: string) => {
      this.zone.run(() => {
        this.log.appendLog(`${connection}> disconnect`);

        this._redisDisconnectSource.next(connection);
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisResponse, (_: IpcRendererEvent, connection: string, response: any) => {
      this.zone.run(() => {
        this.log.appendLog(`${connection}> [Resp] ${response}`);

        this._redisResponseSource.next({
          connection: connection,
          response: response
        });
      });
    });
  }

  //#endregion

  //#region Commands

  testConnect(host: string, port: number) {
    this.electron.ipcRenderer.send(commands.RedisTestConnect, host, port);
  }

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

  //#endregion

}
