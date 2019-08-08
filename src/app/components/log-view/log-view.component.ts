import {Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import {Log} from '../../models/log';
import {LogService} from '../../services/log.service';
import {SourceService} from '../../services/source.service';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.css']
})
export class LogViewComponent implements OnInit {

  protected logs: Log[] = [];
  protected sources: string[];
  @Input() protected currentSource: string;

  constructor(protected logService: LogService, protected sourceService: SourceService) {}

  protected getLogs() {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }

  protected getLogsBySource(source: string): void {
    this.logService.getLogsBySource(source).subscribe(logs => this.logs = logs);
    console.log(this.logs);
  }

  protected getSources(): void {
    this.sourceService.getSources().subscribe(sources => this.sources = sources);
  }

  protected setCurrentSourceAndUpdateLogs(selectedSource: string) {
    this.currentSource = selectedSource;
    console.log(this.currentSource);
    this.getLogsBySource(this.currentSource);
  }

  ngOnInit() {
    this.getSources();
    this.getLogs();
  }
}
