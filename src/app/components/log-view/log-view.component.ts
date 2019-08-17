import {Component, Input, OnInit} from '@angular/core';
import {Log} from '../../models/log';
import {HttpService} from '../../services/http-service/http.service';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.css']
})
export class LogViewComponent implements OnInit{

  @Input() table: boolean;
  logs: Log[];
  sources: string[];
  source: string;
  totalItems: number;
  @Input() pageNum;
  pageSize = 20;

  constructor(protected httpService: HttpService) {
    this.pageNum = 0;
  }

  setPageNum(pageNum: number){
    this.pageNum = pageNum - 1;
    this.getLogsBySource(this.source);
  }
  ngOnInit() {
    this.getLogsBySource(this.source);
    this.getSources();
  }

  protected getTotalItems(source: string): void{
    this.httpService.getTotalItems(source).subscribe(totalItems =>{this.totalItems = totalItems});
  }

  protected getSources(): void {
    this.httpService.getSources().subscribe(sources => {this.sources = sources; this.sources.push("not specified")});
  }

  protected getLogsBySource(source: string): void {
    if (source == 'not specified' || source == undefined){
      this.httpService.getLogs(this.pageNum, this.pageSize).subscribe(logs => this.logs = logs);
    } else {
      this.httpService.getLogsBySource(this.source, this.pageNum, this.pageSize).subscribe(logs => this.logs = logs);
    }
    this.getTotalItems(this.source);
  }

  selectedSource(source) {
    this.source = source;
    this.getLogsBySource(this.source);
  }

}
