import {Component, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../models/log';
import {LogService} from '../../services/log.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {

  displayedColumns = ['source', 'dateTime', 'message'];
  private logs: Log[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.getLogs();
  }

  private getLogs(): void {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }
}
