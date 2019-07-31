import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from '../components/app.component';
import { TableViewComponent } from '../components/table-view/table-view.component';
import { TextViewComponent } from '../components/text-view/text-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DemoMaterialModule} from './material-module';
import {MatNativeDateModule} from '@angular/material/core';
import {LogService} from '../services/log.service';

@NgModule({
  declarations: [AppComponent, TableViewComponent, TextViewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
