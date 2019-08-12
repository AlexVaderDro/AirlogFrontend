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
  file: File;
  strLogs: string;

  displayedColumns = ['source', 'dateTime', 'message'];

  constructor(protected httpService: HttpService) {
  }

  ngOnInit(): void {
  }

  getLogsByDateAndSource(date: string, source: string): Log[] {
    this.httpService.getLogsByDateAndSource(date, source).subscribe(logs => this.logsToFile = logs);
    console.log(this.logsToFile);
    return this.logsToFile;
  }

  save(date: string, source: string): void {
    console.log(this.getLogsByDateAndSource(date, source));
    for (let log of this.logsToFile){
      let dateInLong = new Date(log.dateTime);
      let dateInString = dateInLong.toDateString()+" "+dateInLong.toTimeString();
      this.strLogs += dateInString +" "+log.source+" "+log.message+"\n"
    }
    let dateInLong = new Date(date);
    let dateInString = dateInLong.toDateString()+" "+dateInLong.toTimeString();
    this.file = new File([this.strLogs], "logs_after_"+dateInString+".txt", {type: "text/plain;charset=utf-8"});
    saveAs(this.file);
  }
}
