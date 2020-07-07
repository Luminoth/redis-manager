import {
  Component, OnInit, OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AppElectronService } from '../../services/app-electron.service';
import { RedisService } from '../../services/redis.service';

import { ConnectionDialogComponent } from '../../dialogs/connection-dialog/connection-dialog.component';
import { SettingsDialogComponent } from '../../dialogs/settings-dialog/settings-dialog.component';

import * as notifications from '../../../../electron/notifications';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppViewComponent implements OnInit, OnDestroy {

  // subscriptions
  private _connectionAddedSubscription: Subscription;
  private _connectionRemovedSubscription: Subscription;
  private _redisConnectStatusSubscription: Subscription;
  private _redisDisconnectSubscription: Subscription;

  //#region Lifecycle

  constructor(private titleService: Title,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private electron: AppElectronService,
    private redis: RedisService) {
    this._connectionAddedSubscription = this.electron.redisConnectionAdded$.subscribe(connection => {
      this.snackBar.open(`Redis connection '${connection}' added`, 'Ok', {
        duration: 3000
      });
    });

    this._connectionRemovedSubscription = this.electron.redisConnectionRemoved$.subscribe(connection => {
      this.snackBar.open(`Redis connection '${connection}' removed`, 'Ok', {
        duration: 3000
      });
    });

    this._redisConnectStatusSubscription = this.redis.redisConnectStatus$.subscribe(status => {
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

    this._redisDisconnectSubscription = this.redis.redisDisconnect$.subscribe(connection => {
      this.snackBar.open(`Redis connection '${connection}' disconnected`, 'Ok', {
        duration: 5000
      });
    });
  }

  ngOnInit() {
    this.titleService.setTitle(`${environment.title}`);
  }

  ngOnDestroy() {
    this._redisDisconnectSubscription.unsubscribe();
    this._redisConnectStatusSubscription.unsubscribe();

    this._connectionAddedSubscription.unsubscribe();
    this._connectionRemovedSubscription.unsubscribe();
  }

  //#endregion

  //#region Events

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

  //#endregion
}
