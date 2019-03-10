import { Injectable } from '@angular/core';
import { remote } from 'electron';

import { Config } from '../../electron/config';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  //#region Lifecycle

  constructor() {
  }

  //#endregion

  //#region IPC accessors

  get ipc() {
    return require('electron').ipcRenderer;
  }

  get config() {
    return remote.getGlobal('config') as Config;
  }

  //#endregion
}
