import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  private settingsForm!: FormGroup;

  //#region Lifecycle

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>,
    private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
    });
  }

  ngOnInit() {
  }

  //#endregion

  onOk() {
    console.log('TODO: save the settings');

    this.dialogRef.close();
  }

}
