import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  pageSize: number = 20;
  @Input() pageNum: number;
  @Input() totalItems: number;
  @Output() pageNumChanged = new EventEmitter<number>();

  constructor() {
    this.pageNum = 0;
  }

  ngOnInit(): void {
  }

  onChange(event) {
    this.pageNum = event;
    this.pageNumChanged.emit(this.pageNum);
  }
}
