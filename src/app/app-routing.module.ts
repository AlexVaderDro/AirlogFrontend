import {NgModule} from '@angular/core';
import {TableViewComponent} from './components/table-view/table-view.component';
import {TextViewComponent} from './components/text-view/text-view.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuardService} from "./services/auth-guard-service/auth-guard.service";
import {SignUpComponent} from "./components/signup/sign-up.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'table', component: TableViewComponent, canActivate: [AuthGuardService]},
  {path: 'table?id=:id&source=:source&start=:start&end=:end&page=:page', component: TableViewComponent, canActivate: [AuthGuardService]},
  {path: 'text', component: TextViewComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
