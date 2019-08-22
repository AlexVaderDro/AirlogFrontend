import {Component, EventEmitter, OnInit} from '@angular/core';
import {LogService} from '../../services/log-service/log.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {
  private markedLogId: number;

  constructor(protected logService: LogService, private activateRoute: ActivatedRoute) {

    const id = this.activateRoute.snapshot.params['id'];
    const source = this.activateRoute.snapshot.params['source'];
    const dateStart = this.activateRoute.snapshot.params['start'];
    const dateEnd = this.activateRoute.snapshot.params['end'];
    const page = this.activateRoute.snapshot.params['page'];

    if (id) {
      // TODO unable/disable modifier
      this.markedLogId = id;
    }

    if (dateStart) {
      this.logService.dateStart = dateStart;
    }

    if (dateEnd) {
      this.logService.dateEnd = dateEnd;
    }

    if (source) {
      this.logService.currentSource = source;
    }

    if (page) {
      this.logService.currentPage = page;
    }

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
