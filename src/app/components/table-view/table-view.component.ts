import {Component, OnInit, ViewChild} from '@angular/core';
import {Log} from '../../models/log';
import {LogService} from '../../services/log.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MOCK_DATA} from '../../mockdata';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {

  displayedColumns = ['dateTime', 'message'];
  private logs: Log[] = [];
  private sortableLogs;

  @ViewChild(MatSort, {static: true})
  private sort: MatSort;

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.getLogs();
    this.sortableLogs = new MatTableDataSource(this.logs);
    this.sortableLogs.sort = this.sort;
  }
  
  private getLogs(): void {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }
}