import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../models/log';
import {MatPaginator, MatTableDataSource} from "@angular/material";

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
