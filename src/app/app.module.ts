import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TextViewComponent } from './text-view/text-view.component';

@NgModule({
  declarations: [AppComponent, TableViewComponent, TextViewComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
