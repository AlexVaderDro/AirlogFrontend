import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { TextViewComponent } from './components/text-view/text-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { LogService } from './services/log.service';

import { AppRoutingModule } from './modules/app-routing.module';
import { SourceSelectionComponent } from './components/source-selection/source-selection.component';
import {SourceService} from './services/source.service';
import {HeaderComponent} from './components/header/header.component';
import {SourcePipe} from './pipes/source.pipe';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';

@NgModule({
  declarations: [AppComponent, TableViewComponent, TextViewComponent, SourceSelectionComponent, HeaderComponent, SourcePipe],
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
    LogService,
    SourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
