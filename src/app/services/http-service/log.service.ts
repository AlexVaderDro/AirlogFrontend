import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Log} from '../../models/log';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {isUndefined} from 'util';
import {removeSummaryDuplicates} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private _currentSource: string;
  private _currentPage: number = 1;
  private _totalItems: number;
  private _pageSize: number = 20;
  private _logs: Log[];
  private _dateStart: string = (Date.now() - 86400000).toString(); //minus day
  private _dateEnd: string = (Date.now() + 86400000).toString();   //plus day

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

  constructor(private httpClient: HttpClient) {
    let url = `${environment.url}/getTotalItems`;
    this.httpClient.get<number>(url).subscribe(num => this.totalItems = num);
    this.getLogsByDate(this.dateStart, this.dateEnd, this.currentSource, this.currentPage, this.pageSize);
  }

  public update() {
    this.dateStart = Date.parse(this.dateStart).toString();
    this.dateEnd = Date.parse(this.dateEnd).toString();
    this.getLogsByDate(this.dateStart, this.dateEnd, this.currentSource, this.currentPage, this.pageSize);
  }

  public getTotalItems(): Observable<number> {
    let url: string;
    if (this.currentSource == undefined || this._currentSource === 'not specified') {
      url = `${environment.url}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}`;
    } else {
      url = `${environment.url}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}&source=${this._currentSource}`;
    }
    console.log(url);
    return this.httpClient.get<number>(url, options);
  }

  public getSources(): Observable<string[]> {
    const url = `${environment.url}/sources`;
    return this.httpClient.get<string[]>(url, options);
  }

  public getLogsByDate(start: string, end: string, source: string, pageNum: number, pageSize: number) {
    let url: string;
    this.getTotalItems().subscribe(num => {
      this.totalItems = num;
      console.log();
      if (source == undefined || source == 'not specified') {
        url = `${environment.url}/logs?start=${start}&end=${end}&pageNum=${pageNum}&pageSize=${pageSize}`;
      } else {
        url = `${environment.url}/logs?start=${start}&end=${end}&source=${source}&pageNum=${pageNum}&pageSize=${pageSize}`;
      }
      console.log(url + " " + this.totalItems);
      this.httpClient.get<Log[]>(url, options).subscribe(logs => this.logs = logs);
    });
  }
}

const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const options = {headers};
