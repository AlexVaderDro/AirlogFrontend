import {Component, Input, OnInit} from '@angular/core';
import {LogViewComponent} from '../log-view/log-view.component';
import {Log} from '../../models/log';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {

  @Input() logs: Log[];
  @Input() source: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
