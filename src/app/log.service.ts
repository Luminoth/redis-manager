import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _logSource = new Subject<string>();

  //#region Streams

  log$ = this._logSource.asObservable();

  //#endregion

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

    this._logSource.next(logMessage);
  }

}
