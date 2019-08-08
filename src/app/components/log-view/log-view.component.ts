import {Component, EventEmitter, OnInit} from '@angular/core';
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
  protected change = new EventEmitter<String>();
  protected selectedSource: string;

  constructor(protected logService: LogService, protected sourceService: SourceService) {
  }

  public onChangeSelectedSource(source): void {
    this.selectedSource = source;
    this.change.emit(source);
    this.getLogs();
  }

  protected getSources(): void {
    this.sourceService.getSources().subscribe(sources => this.sources = sources);
  }

  ngOnInit() {
    this.getSources();
    this.getLogs();
  }

  protected getLogs(): void {
    if (this.selectedSource == null || this.selectedSource == 'not specified') {
      this.logService.getLogs().subscribe(logs => this.logs = logs);
    } else {
      this.logService.getLogsBySource(this.selectedSource).subscribe(logs => this.logs = logs);
    }
    console.log(this.logs);
  }
}
