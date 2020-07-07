import { NgZone, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IpcRendererEvent } from 'electron';
import { ElectronService } from 'ngx-electron';
import * as redis from 'redis';

import { Config, RedisServerConfig } from '../../../electron/config';
import * as commands from '../../../electron/commands';
import * as notifications from '../../../electron/notifications';

@Injectable({
  providedIn: 'root'
})
export class AppElectronService {

  private _reloadConfigSource = new Subject();
  private _redisConnectionAddedSource = new Subject<string>();
  private _redisConnectionRemovedSource = new Subject<string>();

  //#region Streams

  reloadConfig$ = this._reloadConfigSource.asObservable();
  redisConnectionAdded$ = this._redisConnectionAddedSource.asObservable();
  redisConnectionRemoved$ = this._redisConnectionRemovedSource.asObservable();

  //#endregion

  //#region Lifecycle

  constructor(private electron: ElectronService,
    private zone: NgZone) {
    // electron callbacks need to run through NgZone so they run in the Angular zone

    this.electron.ipcRenderer.on(notifications.ConfigReload, () => {
      this.zone.run(() => {
        this._reloadConfigSource.next();
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisConnectionAdded, (_: IpcRendererEvent, connection: string) => {
      this.zone.run(() => {
        this._redisConnectionAddedSource.next(connection);
      });
    });

    this.electron.ipcRenderer.on(notifications.RedisConnectionRemoved, (_: IpcRendererEvent, connection: string) => {
      this.zone.run(() => {
        this._redisConnectionRemovedSource.next(connection);
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
