import {Observable} from 'rxjs';
import {Log} from '../../models/log';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {saveAs} from 'file-saver';
import {Router} from "@angular/router";

const MILLISECONDS_PER_DAY = 86400000;
const HEADERS = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

const OPTIONS = {headers: HEADERS};

export class LogService {

  private _logs: Log[];

  private _markedLogId: number;
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
    console.log(value);
  }

  get dateEnd(): number {
    return this._dateEnd;
  }

  set dateEnd(value: number) {
    this._dateEnd = value;
    console.log(value);
  }

  get currentSource(): string {
    return this._currentSource;
  }

  set currentSource(value: string) {
    this._currentSource = value;
    this.getTotalItems().subscribe(num => this.totalItems = num);
    console.log(value);
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
    console.log(value);
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
    console.log(value);
  }

  constructor(private httpClient: HttpClient, private route: Router) {
    this.dateStart = (Date.now() - MILLISECONDS_PER_DAY); // minus day
    this.dateEnd = (Date.now());
    const url = `${environment.backendUrl}/getTotalItems?token=${localStorage.getItem('AuthToken')}`;
    this.httpClient.get<number>(url, OPTIONS).subscribe(num => this.totalItems = num);
  }

  public getTotalItems(): Observable<number> {
    let url: string;
    if (this.currentSource == undefined || this._currentSource === 'not specified') {
      url = `${environment.backendUrl}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}&token=${localStorage.getItem('AuthToken')}`;
    } else {
      url = `${environment.backendUrl}/getTotalItems?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}&source=${this._currentSource}&token=${localStorage.getItem('AuthToken')}`;
    }
    return this.httpClient.get<number>(url, OPTIONS);
  }

  public getSources(): Observable<string[]> {
    const url = `${environment.backendUrl}/sources?token=${localStorage.getItem('AuthToken')}`;
    return this.httpClient.get<string[]>(url, OPTIONS);
  }

  public createLink(id: number): string {
    let url = `${environment.frontendUrl}/table` +
      `?id=${id}&source=${this.currentSource}&start=${this.dateStart}&end=${this.dateEnd}&page=${this.currentPage}`;
    return url;
  }

  public getLogs() {
    console.log(HEADERS);
    let url: string;
    this.getTotalItems().subscribe(num => {
      this.totalItems = num;
      if (this.currentSource == undefined || this.currentSource == 'not specified') {
        url = `${environment.backendUrl}/logs?start=${this.dateStart}&end=${this.dateEnd}&pageNum=${this.currentPage}&pageSize=${this.pageSize}&token=${localStorage.getItem('AuthToken')}`;
      } else {
        url = `${environment.backendUrl}/logs?start=${this.dateStart}&end=${this.dateEnd}&source=${this.currentSource}&pageNum=${this.currentPage}&pageSize=${this.pageSize}&token=${localStorage.getItem('AuthToken')}`;
      }
      console.log(url);
      this.httpClient.get<Log[]>(url, OPTIONS).subscribe(logs => {
        this.logs = logs;
        console.log(this.logs);
      });
    });
  }

  public save(): void {
    let url = '';
    if (this.currentSource == undefined || this.currentSource == 'not specified') {
      url = `${environment.backendUrl}/logs?start=${this.dateStart}&end=${this.dateEnd}&size=${this.totalItems}&token=${localStorage.getItem('AuthToken')}`;
    } else {
      url = `${environment.backendUrl}/logs?start=${this.dateStart}&end=${this.dateEnd}&source=${this.currentSource}&size=${this.totalItems}&token=${localStorage.getItem('AuthToken')}`;
    }
    this.httpClient.get(url, {responseType: 'text'}).subscribe(logs => {
      const file = new File(
        [logs],
        `logs from ${this.dateStart} to ${this.dateEnd} by ${this.currentSource}.txt`,
        {type: 'text/plain;charset=utf-8'}
      );
      saveAs(file);
    });
  }
}
