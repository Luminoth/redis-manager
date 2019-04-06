import { Injectable } from '@angular/core';
import * as moment from 'moment';

class LogMessage {
  timestamp: moment.Moment = moment();
  message = '';

  public toString() {
    return `${this.timestamp.format()} ${this.message}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _logMessages: LogMessage[] = [];

  //#region Lifecycle

  constructor() {
  }

  //#endregion

  get logString() {
    return this._logMessages.join('\n');
  }

  appendLog(message: string) {
    const logMessage: LogMessage = {
      timestamp: moment(),
      message: message
    };

    //console.log(logMessage.toString());
    console.log(logMessage.message);
    this._logMessages.push(logMessage);
  }

}
