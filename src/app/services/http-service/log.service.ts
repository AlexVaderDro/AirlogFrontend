import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Log} from '../../models/log';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private _currentSource: string;
  private _currentPage: number = 1;
  private _totalItems: number;
  private _pageSize: number = 20;
  private _logs: Log[];

  get currentSource(): string {
    return this._currentSource;
  }

  set currentSource(value: string) {
    this._currentSource = value;
    this.getTotalItems();
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
    this.getLogs(this.currentSource, this.currentPage, this.pageSize);
  }


  public getTotalItems(): Observable<number> {
    let url: string;
    if (this._currentSource == undefined || this._currentSource == 'not specified') {
      url = `${environment.url}/getTotalItems`
    } else {
      url = `${environment.url}/getTotalItems?source=${this._currentSource}`;
    }
    return this.httpClient.get<number>(url, options);
  }

  public getSources(): Observable<string[]> {
    const url = `${environment.url}/sources`;
    return this.httpClient.get<string[]>(url, options);
  }

  public getLogs(source: string, pageNum: number, pageSize: number): Observable<Log[]> {
    let url;
    if (source == undefined || source == 'not specified') {
      url = `${environment.url}/logs?pageNum=${pageNum}&pageSize=${pageSize}`;
    } else {
      url = `${environment.url}/logs?source=${source}&pageNum=${pageNum}&pageSize=${pageSize}`;
    }
    console.log(url);

    return this.httpClient.get<Log[]>(url, options);
  }

  public getLogsByDateAndSource(start: string, end: string, source: string, pageNum: number, pageSize: number): Observable<Log[]> {
    let url: string;
    if (source == undefined || source == 'not specified') {
      url = `${environment.url}/logs?start=${start}&end=${end}&pageNum=${pageNum}&pageSize=${pageSize}`;
    } else {
      url = `${environment.url}/logs?start=${start}&end=${end}&source=${source}&pageNum=${pageNum}&pageSize=${pageSize}`;
    }
    return this.httpClient.get<Log[]>(url, options);
  }
}

const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const options = {headers};
