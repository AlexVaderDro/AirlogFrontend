import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {Log} from '../../models/log';
import {SourceService} from '../../services/source.service';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {
  private logs: Log[];
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
