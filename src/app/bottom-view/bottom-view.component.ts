import { Component, OnInit } from '@angular/core';

enum BottomViewTabType {
  Log,
}

interface BottomViewTab {
  label: string;
  type: BottomViewTabType;
}

@Component({
  selector: 'app-bottom-view',
  templateUrl: './bottom-view.component.html',
  styleUrls: ['./bottom-view.component.scss']
})
export class BottomViewComponent implements OnInit {
  TabType = BottomViewTabType;

  tabs: BottomViewTab[] = [];

  //#region Lifecycle

  constructor() {
  }

  ngOnInit() {
    this.addLogView();
  }

  //#endregion

  private addLogView() {
    this.tabs.push({
      label: 'Log',
      type: BottomViewTabType.Log,
    });
  }

}
