import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule
  ],
  exports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule
  ]
})
export class AppMaterialModule { }
