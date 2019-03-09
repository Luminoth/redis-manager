import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-view',
  templateUrl: './bottom-view.component.html',
  styleUrls: ['./bottom-view.component.scss']
})
export class BottomViewComponent implements OnInit {
  tabs: string[] = [];

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
    this.addLogView();
  }

  //#endregion

  addLogView() {
    this.tabs.push('Log');
  }

}
