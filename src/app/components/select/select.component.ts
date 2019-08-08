import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SourceService} from "../../services/source.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  //todo сделать в выпадающем списке дефолтное значение
  @Input() data: string[];
  @Output() dataChange = new EventEmitter<String>();
  currentData: string;

  constructor() {
  }

  ngOnInit() {


  }

  public onDataChange(currentData: string): void{
    this.currentData = currentData;
    this.dataChange.emit(currentData);
  }
}
