import { Component, OnInit } from '@angular/core';

import { LogService } from '../log.service';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss']
})
export class LogViewComponent implements OnInit {

  //#region Lifecycle

  constructor(public log: LogService) {
  }

  ngOnInit() {
  }

  //#endregion

}
