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
    this.httpService.getLogsByDate(this.httpService.dateStart, this.httpService.dateEnd,
      this.httpService.currentSource, this.httpService.currentPage, this.httpService.pageSize);
  }

  ngOnInit(): void {
  }

  onChange() {
    this.httpService.getLogsByDate(this.httpService.dateStart, this.httpService.dateEnd,
      this.httpService.currentSource, this.httpService.currentPage, this.httpService.pageSize);
  }
}
