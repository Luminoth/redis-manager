import { NgModule } from '@angular/core';
import { MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule
  ],
  exports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule
  ]
})
export class AppMaterialModule { }
