import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { Config } from '../../electron/config';

@Injectable({
  providedIn: 'root'
})
export class AppElectronService {

  constructor(private electron: ElectronService) {
  }

  get config() {
    return this.electron.remote.getGlobal('config') as Config;
  }
}
