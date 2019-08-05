import {Component, OnInit} from '@angular/core';
import {Log} from '../../models/log';
import {LogService} from '../../services/log.service';
import {SourceSelectionComponent} from '../source-selection/source-selection.component';
import {SourceService} from '../../services/source.service';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {
  displayedColumns = ['souce', 'date', 'message'];
  logs: Log[] = [];
  soures: string[];
  sources: string[];

  private getSources() {
    this.sourceService.getSources().subscribe(sources => this.sources = sources);
  }

  constructor(private logService: LogService, private sourceService: SourceService) {
  }

  ngOnInit() {
    this.getLogs();
    this.getSources();
  }

  private getLogs(): void {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }
}




