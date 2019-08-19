import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Log} from '../../models/log';
import {HttpService} from '../../services/http-service/http.service';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {

  @Input() logs: Log[];
  @Input() source: string;
  pageSize = 20;
  pageNum: number;
  @Input() totalItems: number;
  @Output() pageNumChanged = new EventEmitter<number>();

  constructor(protected httpService: HttpService) {
    this.pageNum = 1;
    this.httpService.setCurrentPageNum(this.pageNum);
    this.httpService.setCurrentPageSize(this.pageSize);
    // this.httpService.getLogsBySource();
  }

  ngOnInit(): void {
    this.logs = this.httpService.getCurrentLogs();
  }

  onChange(event) {
    this.pageNum = event;
    this.pageNumChanged.emit(this.pageNum);
  }

  selectedSource(source) {
    this.source = source;
  }
}
