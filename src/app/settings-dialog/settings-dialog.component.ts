import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

enum State {
  Idle,
}

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  State = State;
  private _state = State.Idle;

  private settingsForm!: FormGroup;

  //#region Lifecycle

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  //#endregion

  private createForm() {
    this.settingsForm = this.fb.group({
    });
  }

  get state() {
    return this._state;
  }

  set state(state: State) {
    this._state = state;
    if (this.state === State.Idle) {
      this.settingsForm.enable();
    } else {
      this.settingsForm.disable();
    }
  }

  //#region Events

  onOk() {
    if (!this.settingsForm.valid) {
      return;
    }

    console.log('TODO: save the settings');

    this.dialogRef.close();
  }

  //#endregion

}
