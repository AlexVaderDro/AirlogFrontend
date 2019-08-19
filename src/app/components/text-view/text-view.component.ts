import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Log} from '../../models/log';
import {LogService} from '../../services/http-service/log.service';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {

  constructor(protected httpService: LogService) {
    this.httpService.getLogs(
      this.httpService.currentSource, this.httpService.currentPage - 1, this.httpService.pageSize)
      .subscribe(logs => this.httpService.logs = logs);
  }

  ngOnInit(): void {
  }

  onChange() {
    this.httpService.getLogs(this.httpService.currentSource, this.httpService.currentPage - 1, this.httpService.pageSize)
      .subscribe(logs => this.httpService.logs = logs);
  }
}
