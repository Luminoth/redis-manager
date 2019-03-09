import { Injectable } from '@angular/core';

import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private ipc: IpcRenderer;

  constructor() {
    this.ipc = require('electron').ipcRenderer;
  }
}