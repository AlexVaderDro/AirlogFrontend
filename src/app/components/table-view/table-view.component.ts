import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../models/log';
import {saveAs} from 'file-saver';
import {HttpService} from "../../services/http-service/http.service";
import {log} from "util";

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {
  @Input() logs: Log[];
  @Input() source: string;
  displayedColumns = ['source', 'dateTime', 'message'];
  logsToFile: Log[] = [];

  constructor(protected httpService: HttpService) {
  }

  ngOnInit(): void {
    this.source = 'not specified';
  }

  getLogsByDate(start: string, end: string): void {
    this.httpService.getLogsByDateAndSource(start, end, this.source).subscribe(logs => this.logsToFile = logs);
  }

  save(date: string, dateEnd?: string): void { // dateEnd - optional parameter
    if (dateEnd == undefined){
      dateEnd = date+5000; //plus 5 sec
    }
    this.getLogsByDate(date, dateEnd);
    let strLogs: string;
    console.log(this.logsToFile);
    for (let log of this.logsToFile) {
      let dateInLong = new Date(log.dateTime);
      let dateInString = dateInLong.toDateString() + " " + dateInLong.toTimeString();
      strLogs += dateInString + " " + log.source + " " + log.message + "\n"
    }
    let dateInLong = new Date(date);
    let dateInString = dateInLong.toDateString() + " " + dateInLong.toTimeString();
    let file = new File([strLogs], "logs_after_" + dateInString + ".txt", {type: "text/plain;charset=utf-8"});
    saveAs(file);
  }
}
