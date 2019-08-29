import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogService} from '../../services/log-service/log.service';
import {DateFormatPipe} from '../../pipes/date-format.pipe';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [DateFormatPipe]
})
export class ToolbarComponent implements OnInit {

  private _dateStart: string;
  private _dateEnd: string;

  get dateStart(): string {
    return this._dateStart;
  }

  set dateStart(value: string) {
    this._dateStart = value;
  }

  get dateEnd(): string {
    return this._dateEnd;
  }

  set dateEnd(value: string) {
    this._dateEnd = value;
  }

  setStartDate(event) {
    this.logService.dateStart = Date.parse(event.target.value);
    this.logService.getLogs();
  }

  setEndDate(event) {
    this.logService.dateEnd = Date.parse(event.target.value);
    this.logService.getLogs();
  }

  /**
   *  TODO solve the problem with incorrect showing the date when a user loads the page by query params in a link
   *   (now the date is shown by default instead of date that was gotten from a query params)
   */
  constructor(private router: Router, private logService: LogService, private dateFormatter: DateFormatPipe) {
    this._dateStart = this.dateFormatter.transform(new Date(this.logService.dateStart));
    this._dateEnd = this.dateFormatter.transform(new Date(this.logService.dateEnd));
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
