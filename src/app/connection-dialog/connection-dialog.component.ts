import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { AppElectronService } from '../app-electron.service';
import { RedisService } from '../redis.service';
import { nameInUseValidator } from '../redis-server-config.directive';
import * as notifications from '../../../electron/notifications';

enum State {
  Idle,
  TestConnection,
}

@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss']
})
export class ConnectionDialogComponent implements OnInit {
  State = State;
  private _state = State.Idle;

  connectionForm!: FormGroup;
  securityForm!: FormGroup;

  //#region Lifecycle

  constructor(public dialogRef: MatDialogRef<ConnectionDialogComponent>,
    private snackBar: MatSnackBar,
    private electron: AppElectronService,
    private redis: RedisService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.connectionForm = this.fb.group({
      name: ['', [
        Validators.required,
        nameInUseValidator(this.electron.config)
      ]],
      address: ['127.0.0.1', [
        Validators.required,
        // TODO: add an IP address / hostname validator
      ]],
      port: [6379, [
        Validators.required,
        Validators.min(0), Validators.max(65535)
      ]],
      // TODO: auth
    });

    this.securityForm = this.fb.group({
    });
  }

  //#endregion

  get state() {
    return this._state;
  }

  set state(state: State) {
    this._state = state;
    if (this.state === State.Idle) {
      this.connectionForm.enable();
      this.securityForm.enable();
    } else {
      this.connectionForm.disable();
      this.securityForm.disable();
    }
  }

  //#region Connection Form

  get name() {
    return this.connectionForm.get('name')!.value as string;
  }

  get address() {
    return this.connectionForm.get('address')!.value as string;
  }

  get port() {
    return +(this.connectionForm.get('port')!.value as string);
  }

  //#endregion

  //#region Events

  onOk() {
    if (!this.connectionForm.valid) {
      return;
    }

    this.electron.addRedisConfig({
      name: this.name,
      host: this.address,
      port: this.port
    });

    this.dialogRef.close();
  }

  onTestConnection() {
    if (!this.connectionForm.valid) {
      return;
    }

    this.state = State.TestConnection;

    const connectSubscription = this.redis.redisTestConnectStatus$.subscribe(status => {
      switch (status.status) {
        case notifications.RedisConnectStatus.ConnectSuccess:
          this.snackBar.open(`Connection success`, 'Ok', {
            duration: 3000
          });
          break;
        case notifications.RedisConnectStatus.ConnectFailed:
          this.snackBar.open(`Connection failed`, 'Ok');
          break;
        default:
          return;
      }

      connectSubscription.unsubscribe();
      this.state = State.Idle;
    });
    this.redis.testConnect(this.address, this.port);
  }

  //#endregion

}
