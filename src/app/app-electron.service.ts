import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import * as redis from 'redis';

import { Config, RedisServerConfig } from '../../electron/config';
import * as commands from '../../electron/commands';

@Injectable({
  providedIn: 'root'
})
export class AppElectronService {

  //#region Lifecycle

  constructor(private electron: ElectronService) {
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
