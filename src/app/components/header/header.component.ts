import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  format = 'table';

  constructor() { }

  ngOnInit() {
  }

  tableFormat() {
    console.log('table format');
  }

  textFormat() {
    console.log('text format');
  }
}
