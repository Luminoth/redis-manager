import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSplitModule } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { ServerTreeComponent } from './server-tree/server-tree.component';
import { LogViewComponent } from './log-view/log-view.component';
import { KeyViewContainerComponent } from './key-view-container/key-view-container.component';
import { KeyViewComponent } from './key-view/key-view.component';
import { AppViewComponent } from './app-view/app-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerTreeComponent,
    LogViewComponent,
    KeyViewContainerComponent,
    KeyViewComponent,
    AppViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularSplitModule.forRoot(),
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
