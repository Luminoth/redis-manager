import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { Config } from '../../electron/config';

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
}
