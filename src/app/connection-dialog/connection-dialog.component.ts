import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss']
})
export class ConnectionDialogComponent implements OnInit {

  //#region Lifecycle

  constructor(public dialogRef: MatDialogRef<ConnectionDialogComponent>) {
  }

  ngOnInit() {
  }

  //#endregion

  onOk() {
    console.log('TODO: save the new connection');

    this.dialogRef.close();
  }

}
