import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { environment } from '../../environments/environment';

import { AppElectronService } from '../app-electron.service';
import { RedisService, RedisConnectStatus } from '../redis.service';
import { ConnectionDialogComponent } from '../connection-dialog/connection-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import * as notifications from '../../../electron/notifications';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit, OnDestroy {

  // subscriptions
  private connectionAddedSubscription: Subscription;
  private connectionRemovedSubscription: Subscription;
  private redisConnectStatusSubscription: Subscription;
  private redisDisconnectSubscription: Subscription;

  //#region Lifecycle

  constructor(private titleService: Title,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private electron: AppElectronService,
    private redis: RedisService) {
    this.connectionAddedSubscription = this.electron.redisConnectionAdded$.subscribe(connection => {
      this.snackBar.open(`Redis connection '${connection}' added`, 'Ok', {
        duration: 3000
      });
    });

    this.connectionRemovedSubscription = this.electron.redisConnectionRemoved$.subscribe(connection => {
      this.snackBar.open(`Redis connection '${connection}' removed`, 'Ok', {
        duration: 3000
      });
    });

    this.redisConnectStatusSubscription = this.redis.redisConnectStatus$.subscribe(status => {
      switch (status.status) {
        case notifications.RedisConnectStatus.ConnectSuccess:
          this.snackBar.open(`Redis connection '${status.connection}' connected`, 'Ok', {
            duration: 3000
          });
          break;
        case notifications.RedisConnectStatus.ConnectFailed:
          this.snackBar.open(`Redis connection '${status.connection}' failed`, 'Ok');
          break;
      }
    });

    this.redisDisconnectSubscription = this.redis.redisDisconnect$.subscribe(connection => {
      this.snackBar.open(`Redis connection '${connection}' disconnected`, 'Ok', {
        duration: 5000
      });
    });
  }

  ngOnInit() {
    this.titleService.setTitle(`${environment.title}`);
  }

  ngOnDestroy() {
    this.redisDisconnectSubscription.unsubscribe();
    this.redisConnectStatusSubscription.unsubscribe();

    this.connectionAddedSubscription.unsubscribe();
    this.connectionRemovedSubscription.unsubscribe();
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
