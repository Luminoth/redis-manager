import { Component, OnInit } from '@angular/core';

// TODO: rename top-view

@Component({
  selector: 'app-key-view-container',
  templateUrl: './key-view-container.component.html',
  styleUrls: ['./key-view-container.component.scss']
})
export class KeyViewContainerComponent implements OnInit {
  tabs: string[] = [];

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
    this.tabs.push('Redis Manager');
  }

  //#endregion

}
