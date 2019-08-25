import {Component, EventEmitter, OnInit} from '@angular/core';
import {LogService} from '../../services/log-service/log.service';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {

  constructor(protected logService: LogService) {
    this.logService.getLogsByDate(
      this.logService.dateStart,
      this.logService.dateEnd,
      this.logService.currentSource,
      this.logService.currentPage,
      this.logService.pageSize
    );
  }

  ngOnInit(): void {
  }

  onChange() {
    this.logService.getLogsByDate(
      this.logService.dateStart,
      this.logService.dateEnd,
      this.logService.currentSource,
      this.logService.currentPage,
      this.logService.pageSize
    );
  }
}
