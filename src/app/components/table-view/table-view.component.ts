import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../models/log';
import {saveAs} from 'file-saver';
import {HttpService} from "../../services/http-service/http.service";

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {
  @Input() logs: Log[];
  @Input() source: string;
  logsToFile: Log[] = [];
  displayedColumns = ['source', 'dateTime', 'message'];

  constructor(protected httpService: HttpService) {
  }

  ngOnInit(): void {
    this.source = 'not specified';
  }

  getLogsByDateAndSource(date: string, source: string): void {
    this.httpService.getLogsByDateAndSource(date, source).subscribe(logs => this.logsToFile = logs);
  }

  save(date: string): void {
    this.getLogsByDateAndSource(date, this.source);
    let strLogs: string;

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
