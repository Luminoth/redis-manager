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

// components
import { ServerTreeComponent } from './components/server-tree/server-tree.component';

// views
import { AppViewComponent } from './views/app-view/app-view.component';
import { TopViewComponent } from './views/top-view/top-view.component';
import { WelcomeViewComponent } from './views/welcome-view/welcome-view.component';
import { KeyViewComponent } from './views/key-view/key-view.component';
import { BottomViewComponent } from './views/bottom-view/bottom-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { ConsoleViewComponent } from './views/console-view/console-view.component';

// dialogs
import { ConnectionDialogComponent } from './dialogs/connection-dialog/connection-dialog.component';
import { SettingsDialogComponent } from './dialogs/settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,

    // components
    ServerTreeComponent,

    // views
    AppViewComponent,
    TopViewComponent,
    WelcomeViewComponent,
    KeyViewComponent,
    BottomViewComponent,
    LogViewComponent,
    ConsoleViewComponent,

    // dialogs
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
