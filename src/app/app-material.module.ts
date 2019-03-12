import { NgModule } from '@angular/core';
import { MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule
  ],
  exports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule, MatDialogModule
  ]
})
export class AppMaterialModule { }
