import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  table: boolean;

  constructor(private router: Router) {
    this.table = true;
  }

  ngOnInit() {
  }

  tableFormat() {
    this.router.navigate(['./table']);
  }

  textFormat() {
    this.router.navigate(['./text']);
  }
}
