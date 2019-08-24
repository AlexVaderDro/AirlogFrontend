import {Observable} from 'rxjs';
import {Log} from '../../models/log';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {saveAs} from 'file-saver';

export class LogService {

  private _logs: Log[];

  private _currentSource: string;
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  private _totalItems: number;

  private _dateStart: number;
  private _dateEnd: number;

  get dateStart(): number {
    return this._dateStart;
  }

  set dateStart(value: number) {
    this._dateStart = value;
    this.getLogsByDate(value, this.dateEnd, this.currentSource, this.currentPage, this.pageSize);
  }

  get dateEnd(): number {
    return this._dateEnd;
  }

  set dateEnd(value: number) {
    this._dateEnd = value;
    this.getLogsByDate(this.dateStart, value, this.currentSource, this.currentPage, this.pageSize);
  }

  get currentSource(): string {
    return this._currentSource;
  }

  set currentSource(value: string) {
    this._currentSource = value;
    this.getTotalItems().subscribe(num => this.totalItems = num);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(value: number) {
    this._totalItems = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  get logs(): Log[] {
    return this._logs;
  }

  set logs(value: Log[]) {
    this._logs = value;
  }

  constructor(private httpClient: HttpClient) {
    this._dateStart = (Date.now() - environment.millisecondsPerDay); // minus day
    this.dateEnd = (Date.now());

    const url = `${environment.backendUrl}/getTotalItems`;
    this.httpClient.get<number>(url).subscribe(num => {
      this.totalItems = num;
    });
    this.getLogsByDate(this.dateStart, this.dateEnd, this.currentSource, this.currentPage, this.pageSize);
  }

  public getTotalItems(): Observable<number> {
    let url: string;
    if (this.currentSource == undefined || this._currentSource === 'not specified') {
      url = `${environment.backendUrl}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}`;
    } else {
      url = `${environment.backendUrl}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}&source=${this._currentSource}`;
    }
    return this.httpClient.get<number>(url, options);
  }

  public getSources(): Observable<string[]> {
    const url = `${environment.backendUrl}/sources`;
    return this.httpClient.get<string[]>(url, options);
  }

  // TODO an opportunity to choose: table or text
  public createLink(id: number): string {
    return `${environment.frontendUrl}/table/${id}/${this.currentSource}/${this.dateStart}/${this.dateEnd}/${this.currentPage}`;
  }

  public getLogsByDate(start: number, end: number, source: string, pageNum: number, pageSize: number) {
    let url: string;
    this.getTotalItems().subscribe(num => {
      this.totalItems = num;
      console.log();
      if (source == undefined || source == 'not specified') {
        url = `${environment.backendUrl}/logs?start=${start}&end=${end}&pageNum=${pageNum}&pageSize=${pageSize}`;
      } else {
        url = `${environment.backendUrl}/logs?start=${start}&end=${end}&source=${source}&pageNum=${pageNum}&pageSize=${pageSize}`;
      }
      this.httpClient.get<Log[]>(url, options).subscribe(logs => this.logs = logs);
    });
  }

  private getLogsToSave(start: number, end: number, source: string, pageNum: number, quantity: number): Observable<Log[]> {
    let url = "";
    if (source == undefined || source == 'not specified') {
      url = `${environment.backendUrl}/logs?start=${start}&end=${end}&pageNum=${pageNum}&pageSize=${quantity}`;
    } else {
      url = `${environment.backendUrl}/logs?start=${start}&end=${end}&source=${source}&pageNum=${pageNum}&pageSize=${quantity}`;
    }
    console.log(url + " " + this.totalItems);

    return this.httpClient.get<Log[]>(url, options);
  }

  save(): void {
    let strLogs = '';
    this.getLogsToSave(this.dateStart, this.dateEnd, this.currentSource, 1, this.totalItems).subscribe(logs => {
      for (let log of logs) {
        let dateInLong = new Date(log.dateTime);
        let dateInString = dateInLong.toDateString() + ' ' + dateInLong.toTimeString();
        strLogs += dateInString + ' ' + log.source + ' ' + log.message + '\n';
      }
      let file = new File([strLogs], 'logs.txt', {type: 'text/plain;charset=utf-8'});
      saveAs(file);
    });
  }
}

const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const options = {headers};
