import {Component, OnInit} from '@angular/core';
import {Log} from '../../models/log';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent implements OnInit {
  displayedColumns = ['date', 'message'];
  logs: Log[];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.getLogs();
  }

  private getLogs(): void {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }
}




