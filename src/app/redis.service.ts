import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class RedisService {

  //#region Lifecycle

  constructor(private electron: ElectronService,
    private log: LogService) {
  }

  //#endregion

  exec(cmd: string) {
    this.log.appendLog(`redis> ${cmd}`);
    this.electron.ipcRenderer.send('redis-cmd', cmd);
  }
}
