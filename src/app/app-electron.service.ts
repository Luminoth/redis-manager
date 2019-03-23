import { NgZone, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IpcMessageEvent } from 'electron';
import { ElectronService } from 'ngx-electron';
import * as redis from 'redis';

import { Config, RedisServerConfig } from '../../electron/config';
import * as commands from '../../electron/commands';
import * as notifications from '../../electron/notifications';

@Injectable({
  providedIn: 'root'
})
export class AppElectronService {

  private reloadConfigSource = new Subject();
  private redisConnectionAddedSource = new Subject<string>();
  private redisConnectionRemovedSource = new Subject<string>();

  //#region Streams

  reloadConfig$ = this.reloadConfigSource.asObservable();
  redisConnectionAdded$ = this.redisConnectionAddedSource.asObservable();
  redisConnectionRemoved$ = this.redisConnectionRemovedSource.asObservable();

  //#endregion

  //#region Lifecycle

  constructor(private electron: ElectronService,
    private zone: NgZone) {
    // electron callbacks need to run through NgZone so they run in the Angular zone

    this.electron.ipcRenderer.on(notifications.ConfigReload, () => {
      this.zone.run(() => {
        this.reloadConfigSource.next();
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisConnectionAdded, (_: IpcMessageEvent, connection: string) => {
      this.zone.run(() => {
        this.redisConnectionAddedSource.next(connection);
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisConnectionRemoved, (_: IpcMessageEvent, connection: string) => {
      this.zone.run(() => {
        this.redisConnectionRemovedSource.next(connection);
      });
    });
  }

  //#endregion

  get config() {
    return this.electron.remote.getGlobal('config') as Config;
  }

  get redisConnections() {
    return this.electron.remote.getGlobal('redisConnections') as Map<string, redis.RedisClient>;
  }

  addRedisConfig(config: RedisServerConfig) {
    this.electron.ipcRenderer.send(commands.RedisConfigAdd, config);
  }

  removeRedisConfig(connection: string) {
    this.electron.ipcRenderer.send(commands.RedisConfigRemove, connection);
  }

}
