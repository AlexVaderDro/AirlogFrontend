import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Log} from '../../models/log';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {saveAs} from 'file-saver';
import {isUndefined} from 'util';
import {removeSummaryDuplicates} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _logs: Log[];
  private _markedLogId: number;

  private _currentSource: string;
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  private _totalItems: number;

  private _dateStart: string = (Date.now() - 86400000).toString(); // minus day
  private _dateEnd: string = (Date.now() + 86400000).toString();   // plus day

  get dateEnd(): string {
    return this._dateEnd;
  }

  set dateEnd(value: string) {
    this._dateEnd = value;
  }

  get dateStart(): string {
    return this._dateStart;
  }

  set dateStart(value: string) {
    this._dateStart = value;
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

  get markedLogId(): number {
    return this._markedLogId;
  }

  set markedLogId(value: number) {
    this._markedLogId = value;
  }

  constructor(private httpClient: HttpClient) {
    const url = `${environment.backendUrl}/getTotalItems`;
    this.httpClient.get<number>(url).subscribe(num => {
      this.totalItems = num;
    });
    this.getLogsByDate(this.dateStart, this.dateEnd, this.currentSource, this.currentPage, this.pageSize);
  }

  public update() {
    console.log(Date.parse(this.dateEnd) - Date.parse(this.dateStart));
    if (Date.parse(this.dateEnd) - Date.parse(this.dateStart) < 0) {
      window.alert('End date must be after start date!');
      this.dateStart = (Date.now() - 86400000).toString(); // minus day
      this.dateEnd = (Date.now() + 86400000).toString(); // plus day
    } else {
      this.dateStart = Date.parse(this.dateStart).toString();
      this.dateEnd = Date.parse(this.dateEnd).toString();
      this.getLogsByDate(this.dateStart, this.dateEnd, this.currentSource, this.currentPage, this.pageSize)
    }
  }

  public getTotalItems(): Observable<number> {
    let url: string;
    if (this.currentSource == undefined || this._currentSource === 'not specified') {
      url = `${environment.backendUrl}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}`;
    } else {
      url = `${environment.backendUrl}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}&source=${this._currentSource}`;
    }
    console.log(url);
    return this.httpClient.get<number>(url, options);
  }

  public getSources(): Observable<string[]> {
    const url = `${environment.backendUrl}/sources`;
    return this.httpClient.get<string[]>(url, options);
  }

  public createLink(id: number): string {
    return `${environment.frontendUrl}/table` +
      `?id=${id}&source=${this.currentSource}&start=${this.dateStart}&end=${this.dateEnd}&page=${this.currentPage}`;
  }

  public getLogsByDate(start: string, end: string, source: string, pageNum: number, pageSize: number) {
    let url: string;
    this.getTotalItems().subscribe(num => {
      this.totalItems = num;
      console.log();
      if (source == undefined || source == 'not specified') {
        url = `${environment.backendUrl}/logs?start=${start}&end=${end}&pageNum=${pageNum}&pageSize=${pageSize}`;
      } else {
        url = `${environment.backendUrl}/logs?start=${start}&end=${end}&source=${source}&pageNum=${pageNum}&pageSize=${pageSize}`;
      }
      console.log(url + ' ' + this.totalItems);
      this.httpClient.get<Log[]>(url, options).subscribe(logs => this.logs = logs);
    });
  }

  private getLogsToSave(start: string, end: string, source: string, pageNum: number, quantity: number): Observable<Log[]> {
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
