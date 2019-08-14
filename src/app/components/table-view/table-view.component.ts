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

  save(dateStart: string, dateEnd?: string): void { // dateEnd - optional parameter
    if (dateEnd == undefined){
      dateEnd = dateStart+300000; //plus 5 minutes

    }
    let logsToFile: Log[];
    let strLogs: string;

    dateStart = this.minusMillisecond(dateStart);

    this.httpService.getLogsByDateAndSource(dateStart, dateEnd, this.source).subscribe(logs => {
      logsToFile = logs;
      for (let log of logsToFile) {
        let dateInLong = new Date(log.dateTime);
        let dateInString = dateInLong.toDateString() + " " + dateInLong.toTimeString();
        strLogs += dateInString + " " + log.source + " " + log.message + "\n"
      }
      let dateInLong = new Date(dateStart);
      let dateInString = dateInLong.toDateString() + " " + dateInLong.toTimeString();
      let file = new File([strLogs], "logs_after_" + dateInString + ".txt", {type: "text/plain;charset=utf-8"});
      saveAs(file);
    });
  }

  private minusMillisecond(date: string): string{
    let d = new Date(date);
    d.setMilliseconds(d.getMilliseconds()-1);
    return d.getTime().toString();
  }
}
