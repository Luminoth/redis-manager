import { NgZone, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IpcMessageEvent } from 'electron';
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

  private redisTestConnectStatusSource = new Subject<RedisTestConnectStatus>();
  private redisConnectStatusSource = new Subject<RedisConnectStatus>();
  private redisDisconnectSource = new Subject<string>();
  private redisResponseSource = new Subject<RedisResponse>();

  //#region Streams

  redisTestConnectStatus$ = this.redisTestConnectStatusSource.asObservable();
  redisConnectStatus$ = this.redisConnectStatusSource.asObservable();
  redisDisconnect$ = this.redisDisconnectSource.asObservable();
  redisResponse$ = this.redisResponseSource.asObservable();

  //#endregion

  //#region Lifecycle

  constructor(private electron: ElectronService,
    private log: LogService,
    private zone: NgZone) {
    // electron callbacks need to run through NgZone so they run in the Angular zone

    this.electron.ipcRenderer.on(notifications.RedisTestConnect, (_: IpcMessageEvent, host: string, port: number, status: notifications.RedisConnectStatus) => {
      this.zone.run(() => {
        this.log.appendLog(`${host}:${port}> test connect '${status}'`);

        this.redisTestConnectStatusSource.next({
          host: host,
          port: port,
          status: status
        });
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisConnect, (_: IpcMessageEvent, connection: string, status: notifications.RedisConnectStatus) => {
      this.zone.run(() => {
        this.log.appendLog(`${connection}> connect '${status}'`);

        this.redisConnectStatusSource.next({
          connection: connection,
          status: status
        });
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisDisconnect, (_: IpcMessageEvent, connection: string) => {
      this.zone.run(() => {
        this.log.appendLog(`${connection}> disconnect`);

        this.redisDisconnectSource.next(connection);
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisResponse, (_: IpcMessageEvent, connection: string, response: any) => {
      this.zone.run(() => {
        this.log.appendLog(`${connection}> [Resp] ${response}`);

        this.redisResponseSource.next({
          connection: connection,
          response: response
        });
      });
    });
  }

  //#endregion

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

}
