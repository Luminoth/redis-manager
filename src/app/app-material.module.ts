import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule,
  MatStepperModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatStepperModule
  ],
  exports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatStepperModule
  ]
})
export class AppMaterialModule { }
