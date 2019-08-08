import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Input() data: string[];
  @Output() selectedData = new EventEmitter<string>();

  constructor() {}

  selectData(event): void {
    this.selectedData.emit(event.target.value);
  }
}
