import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../services/http-service/http.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  sources: string[];
  @Output() selected = new EventEmitter<string>();
  source: string;


  constructor(protected httpService: HttpService) {
    console.log('SELECT COMPONENT CONSTR');

    console.log(this.sources);
  }

  ngOnInit() {
    this.httpService.getSources();
    this.sources = this.httpService.getCurrentSources();
  }

  onChange() {
    this.selected.emit(this.source);
    this.httpService.setCurrentSource(this.source);
    this.httpService.getLogsBySource();
  }
}
