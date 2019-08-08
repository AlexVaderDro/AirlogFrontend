import {Component} from '@angular/core';
import {LogService} from '../../services/log.service';
import {SourceService} from '../../services/source.service';
import {LogViewComponent} from '../log-view/log-view.component';

@Component({
  selector: 'app-table-view',
  styleUrls: ['./table-view.component.css'],
  templateUrl: './table-view.component.html',
})
export class TableViewComponent extends LogViewComponent {

  displayedColumns = ['source', 'dateTime', 'message'];

  constructor(protected logService: LogService, protected sourceService: SourceService) {
    super(logService,  sourceService);
  }
}
