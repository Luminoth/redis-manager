import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { ServerTreeComponent } from './server-tree/server-tree.component';
import { LogViewComponent } from './log-view/log-view.component';
import { KeyViewContainerComponent } from './key-view-container/key-view-container.component';
import { KeyViewComponent } from './key-view/key-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerTreeComponent,
    LogViewComponent,
    KeyViewContainerComponent,
    KeyViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
