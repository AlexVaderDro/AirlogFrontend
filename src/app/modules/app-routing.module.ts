import {NgModule} from '@angular/core';
import {TableViewComponent} from '../components/table-view/table-view.component';
import {TextViewComponent} from '../components/text-view/text-view.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'table', pathMatch: 'full'},
  {path: 'table', component: TableViewComponent},
  {path: 'text', component: TextViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
