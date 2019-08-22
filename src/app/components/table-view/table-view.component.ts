import {Component, EventEmitter, OnInit} from '@angular/core';
import {Log} from '../../models/log';
import {saveAs} from 'file-saver';
import {LogService} from '../../services/http-service/log.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {
  displayedColumns = ['source', 'dateTime', 'message'];

  constructor(protected httpService: LogService) {
    this.httpService.getLogsByDate(this.httpService.dateStart, this.httpService.dateEnd,
      this.httpService.currentSource, this.httpService.currentPage, this.httpService.pageSize);
  }

  ngOnInit(): void {
  }


  onChange() {
    this.httpService.getLogsByDate(this.httpService.dateStart, this.httpService.dateEnd, this.httpService.currentSource,
      this.httpService.currentPage,
      this.httpService.pageSize);
  }
}
