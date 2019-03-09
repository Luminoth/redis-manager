import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.scss']
})
export class TopViewComponent implements OnInit {
  tabs: string[] = [];

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
    this.tabs.push('Redis Manager');
  }

  //#endregion

}
