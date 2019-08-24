import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LogService} from '../../services/log-service/log.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

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
