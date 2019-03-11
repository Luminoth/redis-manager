import { NgModule } from '@angular/core';
import { MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule
  ],
  exports: [
    MatButtonModule, MatTreeModule, MatTabsModule, MatToolbarModule, MatIconModule
  ]
})
export class AppMaterialModule { }
