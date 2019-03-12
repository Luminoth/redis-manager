import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ElectronService } from 'ngx-electron';

import { AppElectronService } from '../app-electron.service';
import * as notifications from '../../../electron/notifications';

@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss']
})
export class ConnectionDialogComponent implements OnInit {

  private connectionForm!: FormGroup;

  //#region Lifecycle

  constructor(public dialogRef: MatDialogRef<ConnectionDialogComponent>,
    private appElectron: AppElectronService,
    private electron: ElectronService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.connectionForm = this.fb.group({
      main_settings: this.fb.group({
        name: ['', Validators.required],
        address: ['127.0.0.1', Validators.required],
        port: [6379, Validators.required],
        // TODO: auth
      }),
      // TODO: security
    });
  }

  //#endregion

  get name() {
    return this.connectionForm.get('main_settings.name')!.value as string;
  }

  get address() {
    return this.connectionForm.get('main_settings.address')!.value as string;
  }

  get port() {
    return +(this.connectionForm.get('main_settings.port')!.value as string);
  }

  onOk() {
    if (!this.connectionForm.valid) {
      return;
    }

    this.appElectron.config.redisConfig.push({
      name: this.name,
      host: this.address,
      port: this.port
    });
    this.electron.ipcRenderer.send(notifications.RedisConfigUpdate, this.name);

    this.dialogRef.close();
  }

  onTestConnection() {
    console.log('TODO: test the connection');
  }

}
