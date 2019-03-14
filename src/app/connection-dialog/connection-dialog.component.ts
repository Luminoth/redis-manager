import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AppElectronService } from '../app-electron.service';
import { nameInUseValidator } from '../redis-server-config.directive';

@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss']
})
export class ConnectionDialogComponent implements OnInit {

  private connectionForm!: FormGroup;

  //#region Lifecycle

  constructor(public dialogRef: MatDialogRef<ConnectionDialogComponent>,
    private electron: AppElectronService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.connectionForm = this.fb.group({
      main_settings: this.fb.group({
        name: ['', [
          Validators.required,
          nameInUseValidator(this.electron.config)
        ]
        ],
        address: ['127.0.0.1', [
          Validators.required,
          // TODO: add an IP address / hostname validator
        ]
        ],
        port: [6379, [
          Validators.required,
          Validators.min(0), Validators.max(65535)
        ]
        ],
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

    this.electron.addRedisConfig({
      name: this.name,
      host: this.address,
      port: this.port
    });

    this.dialogRef.close();
  }

  onTestConnection() {
    console.log('TODO: test the connection');
  }

}
