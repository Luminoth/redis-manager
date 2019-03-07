import { NgModule } from '@angular/core';
import { MatButtonModule, MatTreeModule, MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatTreeModule, MatTabsModule
  ],
  exports: [
    MatButtonModule, MatTreeModule, MatTabsModule
  ]
})
export class AppMaterialModule { }
