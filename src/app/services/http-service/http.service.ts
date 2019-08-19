import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Log} from '../../models/log';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token: string;
  private sources: string[];
  private logs: Log[];
  private pageNum: number;
  private pageSize: number;
  private source: string;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    // this.token = this.cookieService.get('Auth-Token');
    // this.getSources();
    this.token = `mL5LVR3wXY`;
  }

  public getCurrentSources() {
    return this.sources;
  }

  public getCurrentSource() {
    return this.source;
  }

  public getCurrentLogs() {
    return this.logs;
  }

  public setCurrentPageSize(size: number) {
    this.pageSize = size;
  }

  public setCurrentPageNum(num: number) {
    this.pageNum = num;
  }

  public setCurrentSource(source: string) {
    this.source = source;
  }


  public postLogin(log: string, pass: string): Observable<string> {
    const url = `${environment.url}/login`;
    const body = {login: log, password: pass};
    console.log(body);
    return this.httpClient.post<string>(url, body, options);
  }

  public getTotalItems(source: string): Observable<number> {
    let url: string;
    if (isUndefined(source) || source === 'not specified') {
      url = `${environment.url}/getTotalItems?token=${this.token}`;
    } else {
      url = `${environment.url}/getTotalItems?source=${source}?token=${this.token}`;
    }
    return this.httpClient.get<number>(url, options);
  }

  public getLogs(pageNum: number, pageSize: number): Observable<Log[]> {
    const url = `${environment.url}/logs?pageNum=${pageNum}&pageSize=${pageSize}?token=${this.token}`;
    return this.httpClient.get<Log[]>(url, options);
  }

  public getSources(): void {
    const url = `${environment.url}/sources`;
    this.httpClient.get<string[]>(url, options).subscribe(sources => this.sources = sources);
  }

  public getLogsBySource(): void {
    const url = `${environment.url}/logs?source=${this.source}&pageNum=${this.pageNum}&pageSize=${this.pageSize}?token=${this.token}`;
    this.httpClient.get<Log[]>(url, options).subscribe(logs => this.logs = logs);
  }

  public getLogsByDateAndSource(start: string, end: string, source: string, pageNum: number, pageSize: number): Observable<Log[]> {
    let url: string;
    if (isUndefined(source)) {
      url = `${environment.url}/logs?start=${start}&end=${end}&pageNum=${pageNum}&pageSize=${pageSize}?token=${this.token}`;
    } else {
      url = `${environment.url}/logs?start=${start}&end=${end}&source=${source}&pageNum=${pageNum}&pageSize=${pageSize}?token=${this.token}`;
    }
    return this.httpClient.get<Log[]>(url, options);
  }
}

const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const options = {headers};
