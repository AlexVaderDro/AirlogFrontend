import { NgModule } from '@angular/core';
import { TableViewComponent } from '../components/table-view/table-view.component';
import { TextViewComponent } from '../components/text-view/text-view.component';
import { RouterModule, Routes } from '@angular/router';
import {LogViewComponent} from '../components/log-view/log-view.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: 'table', component: LogViewComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
