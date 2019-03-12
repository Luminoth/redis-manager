import { Injectable } from '@angular/core';
import * as moment from 'moment';

class LogMessage {
  timestamp: moment.Moment = moment();
  message: string = '';
  toString = () => {
    return `${this.timestamp} ${this.message}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logMessages: LogMessage[] = [];

  //#region Lifecycle

  constructor() {
  }

  //#endregion

  get logString() {
    return this.logMessages.join('\n');
  }

  appendLog(message: string) {
    const logMessage: LogMessage = {
      timestamp: moment(),
      message: message
    };

    console.log(`${logMessage}`);

    this.logMessages.push(logMessage);
  }

}
