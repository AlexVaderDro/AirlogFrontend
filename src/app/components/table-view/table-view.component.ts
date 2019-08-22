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

  // save(dateStart: string, dateEnd?: string): void { // dateEnd - optional parameter
  //   if (isUndefined(dateEnd)) {
  //     dateEnd = dateStart + 300000;
  //   }
  //   let logsToFile: Log[];
  //   let strLogs: '';
  //
  //   dateStart = this.minusMillisecond(dateStart);
  //
  //   this.httpService.getLogsByDate(dateStart, dateEnd, this.httpService.currentSource, 0, 100).subscribe(logs => {
  //     logsToFile = logs;
  //     for (let log of logsToFile) {
  //       let dateInLong = new Date(log.dateTime);
  //       let dateInString = dateInLong.toDateString() + ' ' + dateInLong.toTimeString();
  //       strLogs += dateInString + ' ' + log.source + ' ' + log.message + '\n';
  //     }
  //     let dateInLong = new Date(dateStart);
  //     let dateInString = dateInLong.toDateString() + ' ' + dateInLong.toTimeString();
  //     let file = new File([strLogs], 'logs_after_' + dateInString + '.txt', {type: 'text/plain;charset=utf-8'});
  //     saveAs(file);
  //   });
  // }

  private minusMillisecond(date: string): string {
    let d = new Date(date);
    d.setMilliseconds(d.getMilliseconds() - 1);
    return d.getTime().toString();
  }
}
