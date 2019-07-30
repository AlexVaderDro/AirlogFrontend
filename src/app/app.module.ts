import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TextViewComponent } from './text-view/text-view.component';
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DemoMaterialModule} from '../material-module';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [AppComponent, TableViewComponent, TextViewComponent, TableBasicExampleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
