import {Component} from '@angular/core';
import {LogService} from '../../services/log.service';
import {SourceService} from '../../services/source.service';
import {LogViewComponent} from '../log-view/log-view.component';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent extends LogViewComponent {
  constructor(protected logService: LogService, protected sourceService: SourceService) {
    super(logService,  sourceService);
  }
}
