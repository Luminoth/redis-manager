import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppViewComponent } from './views/app-view/app-view.component';

const routes: Routes = [
  { path: 'app', component: AppViewComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', redirectTo: '/app' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
