import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

import { environment } from '../../environments/environment';

import { ConnectionDialogComponent } from '../connection-dialog/connection-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit {

  //#region Lifecycle

  constructor(private titleService: Title,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.titleService.setTitle(`${environment.title}`);
  }

  //#endregion

  onConnectRedis() {
    this.dialog.open(ConnectionDialogComponent, {
      width: '800px',
      height: '600px',
    });
  }

  onSettings() {
    this.dialog.open(SettingsDialogComponent, {
      width: '800px',
      height: '600px',
    });
  }
}
