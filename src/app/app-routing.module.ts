import {NgModule} from '@angular/core';
import {TableViewComponent} from './components/table-view/table-view.component';
import {TextViewComponent} from './components/text-view/text-view.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'table', pathMatch: 'full'},
  {path: 'table', component: TableViewComponent},
  {path: 'table?id=:id&source=:source&start=:start&end=:end&page=:page', component: TableViewComponent},
  {path: 'text', component: TextViewComponent},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
