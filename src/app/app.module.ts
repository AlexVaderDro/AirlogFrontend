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
import {AppRoutingModule} from './modules/app-routing.module';
import {SelectComponent} from './components/select/select.component';
import {HeaderComponent} from './components/header/header.component';
import {SourcePipe} from './pipes/source.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {LoginComponent} from './components/login/login.component';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent, TableViewComponent,
    TextViewComponent, SelectComponent,
    HeaderComponent, SourcePipe,
    LoginComponent],
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
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
