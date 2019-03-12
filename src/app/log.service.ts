import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logMessages: string[] = [];

  //#region Lifecycle

  constructor() {
  }

  //#endregion

  get logString() {
    return this.logMessages.join('\n');
  }

  appendLog(message: string) {
    this.logMessages.push(message);
  }

}
