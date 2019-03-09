import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit {

  //#region Lifecycle

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle(`${environment.title}`);
  }

  //#endregion

  onConnectRedis() {
    console.log('TODO: open redis connection dialog');
  }

  onSettings() {
    console.log('TODO: open settings dialog');
  }
}
