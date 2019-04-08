import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxElectronModule } from 'ngx-electron';
import { AngularSplitModule } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { AppViewComponent } from './app-view/app-view.component';
import { ServerTreeComponent } from './server-tree/server-tree.component';
import { TopViewComponent } from './top-view/top-view.component';
import { WelcomeViewComponent } from './welcome-view/welcome-view.component';
import { KeyViewComponent } from './key-view/key-view.component';
import { BottomViewComponent } from './bottom-view/bottom-view.component';
import { LogViewComponent } from './log-view/log-view.component';
import { ConsoleViewComponent } from './console-view/console-view.component';
import { ConnectionDialogComponent } from './connection-dialog/connection-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AppViewComponent,
    ServerTreeComponent,
    TopViewComponent,
    WelcomeViewComponent,
    KeyViewComponent,
    BottomViewComponent,
    LogViewComponent,
    ConsoleViewComponent,
    ConnectionDialogComponent,
    SettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxElectronModule,
    AngularSplitModule.forRoot(),
    AppRoutingModule,
    AppMaterialModule
  ],
  entryComponents: [
    ConnectionDialogComponent,
    SettingsDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
