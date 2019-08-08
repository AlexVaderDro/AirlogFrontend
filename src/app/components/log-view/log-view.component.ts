import {Component, OnInit} from '@angular/core';
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
  protected currentSource: string;

  constructor(protected logService: LogService, protected sourceService: SourceService) {}

  protected getLogs(): void {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }

  protected getSources(): void {
    this.sourceService.getSources().subscribe(sources => this.sources = sources);
  }

  protected setCurrentSource(selectedSource: string) {
    this.currentSource = selectedSource;
  }

  ngOnInit() {
    this.getSources();
    this.getLogs();
  }

}
