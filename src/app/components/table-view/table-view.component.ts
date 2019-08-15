import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Input() totalItems: number;
  displayedColumns = ['source', 'dateTime', 'message'];
  pageNum: number;
  @Output() pageNumChanged = new EventEmitter<number>();


  constructor(protected httpService: HttpService) {
    this.pageNum = 1;
  }

  ngOnInit(): void {
  }


  onChange(event){
    this.pageNum = event;
    this.pageNumChanged.emit(this.pageNum);
  }

  save(dateStart: string, dateEnd?: string): void { // dateEnd - optional parameter
    if (dateEnd == undefined){
      dateEnd = dateStart+300000; //plus 5 minutes

    }
    let logsToFile: Log[];
    let strLogs: string;

    dateStart = this.minusMillisecond(dateStart);

    //todo 100 - pagesize within saving logs
    this.httpService.getLogsByDateAndSource(dateStart, dateEnd, this.source, this.pageNum, 100).subscribe(logs => {
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
