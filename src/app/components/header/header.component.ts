import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../../services/http-service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  table: boolean;

  constructor(private router: Router, protected httpService: HttpService) {
    this.table = true;
  }

  ngOnInit() {
  }

  tableFormat() {
    this.table = true;
    this.router.navigate(['./table']);
  }

  textFormat() {
    this.table = false;
    this.router.navigate(['./text']);
  }
}
