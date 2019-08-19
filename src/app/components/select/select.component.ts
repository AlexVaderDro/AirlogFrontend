import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../services/http-service/log.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  items: string[];
  selected = new EventEmitter<string>();
  item: string;

  constructor(protected httpService: LogService) {
    httpService.getSources().subscribe(items => {
      this.items = items;
      this.items.push('not specified');
    })
  }

  ngOnInit() {
  }

  onChange() {
    this.selected.emit(this.item);
    this.httpService.currentSource = this.item;
    this.httpService.getLogs(this.httpService.currentSource, this.httpService.currentPage, this.httpService.pageSize).subscribe(logs => {
      this.httpService.logs = logs;
    });
    this.httpService.getTotalItems().subscribe(num => this.httpService.totalItems = num );
  }
}
