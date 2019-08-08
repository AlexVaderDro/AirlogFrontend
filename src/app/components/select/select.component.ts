import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../services/http-service/http.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() sources: string[];
  @Output() selected = new EventEmitter<string>();
  source: string;

  constructor() {
  }

  ngOnInit() {
  }

  onChange() {
    this.selected.emit(this.source);
  }
}
