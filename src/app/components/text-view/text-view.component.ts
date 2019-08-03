import { Component, OnInit } from '@angular/core';
import {LogService} from '../../services/log.service';
import {Log} from '../../models/log';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {
  logs: Log[];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.getLogs();
  }

  getLogs(): void {
    this.logService.getLogs().subscribe(logs => this.logs = logs);
  }

}
