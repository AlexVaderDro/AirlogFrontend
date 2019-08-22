import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogService} from '../../services/log-service/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private logService: LogService) {
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
