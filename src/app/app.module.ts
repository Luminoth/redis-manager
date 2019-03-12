import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxElectronModule } from 'ngx-electron';
import { AngularSplitModule } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { AppViewComponent } from './app-view/app-view.component';
import { ServerTreeComponent } from './server-tree/server-tree.component';
import { TopViewComponent } from './top-view/top-view.component';
import { KeyViewComponent } from './key-view/key-view.component';
import { BottomViewComponent } from './bottom-view/bottom-view.component';
import { LogViewComponent } from './log-view/log-view.component';
import { ConsoleViewComponent } from './console-view/console-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AppViewComponent,
    ServerTreeComponent,
    TopViewComponent,
    KeyViewComponent,
    BottomViewComponent,
    LogViewComponent,
    ConsoleViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxElectronModule,
    AngularSplitModule.forRoot(),
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
