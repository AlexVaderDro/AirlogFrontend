import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {TableViewComponent} from './components/table-view/table-view.component';
import {TextViewComponent} from './components/text-view/text-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DemoMaterialModule} from './modules/material-module';
import {MatNativeDateModule} from '@angular/material/core';
import {AppRoutingModule} from './app-routing.module';
import {SelectComponent} from './components/select/select.component';
import {HeaderComponent} from './components/header/header.component';
import {SourcePipe} from './pipes/source.pipe';
import {NgxPaginationModule} from "ngx-pagination";
import {ClipboardModule} from "ngx-clipboard";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {LogService} from "./services/log-service/log.service";
import {DateFormatPipe} from "./pipes/date-format.pipe";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from "./services/auth-service/auth-service.service";
import {SignUpComponent} from "./components/signup/sign-up.component";


@NgModule({
  declarations: [AppComponent, TableViewComponent, TextViewComponent, SelectComponent, HeaderComponent, SourcePipe, DateFormatPipe, ToolbarComponent, PageNotFoundComponent, LoginComponent, SignUpComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    AppRoutingModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ClipboardModule,
  ],
  bootstrap: [AppComponent],
  providers: [LogService, HttpClientModule, AuthService]
})
export class AppModule {}
