import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  //#region Lifecycle

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit() {
  }

  //#endregion

  onOk() {
    console.log('TODO: save the settings');

    this.dialogRef.close();
  }

}
