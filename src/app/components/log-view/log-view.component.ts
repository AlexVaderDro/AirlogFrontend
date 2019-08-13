import {Component, Input, OnInit} from '@angular/core';
import {Log} from '../../models/log';
import {HttpService} from '../../services/http-service/http.service';
import {Router} from '@angular/router';

// enum formatEnum {
//   table,
//   text
// }

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.css']
})
export class LogViewComponent implements OnInit {

  @Input() table: boolean;
  logs: Log[];
  sources: string[];
  source: string;

  constructor(protected httpService: HttpService) {
  }

  ngOnInit() {
    this.getLogs();
    this.getSources();
  }

  protected getSources(): void {
    this.httpService.getSources().subscribe(sources => {this.sources = sources; this.sources.push("not specified")});
  }

  protected getLogs(): void {
    this.httpService.getLogs().subscribe(logs => this.logs = logs);
  }

  protected getLogsBySource(): void {
    if (this.source == 'not specified'){
      this.httpService.getLogs().subscribe(logs => this.logs = logs);
    } else {
      this.httpService.getLogsBySource(this.source).subscribe(logs => this.logs = logs);
    }
  }

  selectedSource(source) {
    this.source = source;
    this.getLogsBySource();
  }
}
