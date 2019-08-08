import {Component, Input, OnInit} from '@angular/core';
import {Log} from '../../models/log';
import {HttpService} from '../../services/http-service/http.service';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {

  @Input() logs: Log[];

  displayedColumns = ['source', 'dateTime', 'message'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
