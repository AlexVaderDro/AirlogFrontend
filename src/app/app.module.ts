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
import {LogViewComponent} from './components/log-view/log-view.component';
import {HttpService} from './services/http-service/http.service';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';

@NgModule({
  declarations: [AppComponent, TableViewComponent, TextViewComponent, SelectComponent, HeaderComponent, SourcePipe, LogViewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiSourceSelectionComponentModule.forRoot(
     // InMemoryDataService, { dataEncapsulation: false }),
    DemoMaterialModule,
    AppRoutingModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
