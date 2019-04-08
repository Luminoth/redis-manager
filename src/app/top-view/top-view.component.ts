import { Component, OnInit } from '@angular/core';

enum TopViewTabType {
  Welcome,
  Key,
}

interface TopViewTab {
  label: string;
  type: TopViewTabType;
}

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.scss']
})
export class TopViewComponent implements OnInit {
  TabType = TopViewTabType;

  tabs: TopViewTab[] = [];

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
    this.addWelcomeView();
  }

  //#endregion

  private addWelcomeView() {
    this.tabs.push({
      label: 'Redis Manager',
      type: TopViewTabType.Welcome,
    });
  }

  addKeyView(key: string) {
    this.tabs.push({
      label: key,
      type: TopViewTabType.Key,
    });
  }

}
