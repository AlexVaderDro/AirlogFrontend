import {Component, OnInit} from '@angular/core';
import {Log} from '../../models/log';
import {LogService} from '../../services/log.service';
import {SourceService} from '../../services/source.service';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {

  displayedColumns = ['source', 'dateTime', 'message'];
  private logs: Log[] = [];
  private sources: string[];

  constructor(private logService: LogService, private sourceService: SourceService) {}

  private getLogs(): void {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }

  private getSources(): void {
    this.sourceService.getSources().subscribe(sources => this.sources = sources);
  }

  ngOnInit() {
    this.getSources();
    this.getLogs();
  }
}
