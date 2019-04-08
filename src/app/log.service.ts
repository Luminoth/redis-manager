import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _logMessages: string[] = [];

  //#region Lifecycle

  constructor() {
  }

  //#endregion

  get logString() {
    return this._logMessages.join('\n');
  }

  appendLog(message: string) {
    const logMessage = `${moment().format()} ${message}`;

    console.log(logMessage);
    this._logMessages.push(logMessage);
  }

}
