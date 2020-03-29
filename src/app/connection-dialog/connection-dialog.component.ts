import {
  Component, OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppElectronService } from '../app-electron.service';
import { Config } from '../../../electron/config';
import { RedisService } from '../redis.service';
import * as notifications from '../../../electron/notifications';

enum State {
  Idle,
  TestConnection,
}

function nameInUseValidator(config: Config): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (config.redisConfig.find(redisConfig => redisConfig.name === control.value)) {
      return { 'nameInUse': { value: control.value } };
    }

    return null;
  };
}

@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionDialogComponent implements OnInit {
  readonly State = State;
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
    this.createForm();
  }

  //#endregion

  private createForm() {
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
