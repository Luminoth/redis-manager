import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
  MatFormFieldModule, MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule
  ],
  exports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule,
    MatFormFieldModule, MatInputModule
  ]
})
export class AppMaterialModule { }
