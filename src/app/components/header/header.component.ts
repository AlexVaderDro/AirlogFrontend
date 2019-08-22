import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogService} from "../../services/http-service/log.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  table: boolean;

  constructor(private router: Router, private httpService: LogService) {
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
