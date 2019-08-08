import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() data: string[];
  @Output() selectedData = new EventEmitter<string>();

  selectData(event): void {
    this.selectedData.emit(event.target.value);
  }

  constructor() {}

  ngOnInit() {}
}
