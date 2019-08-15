import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Log} from '../../models/log';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  public getTotalItems(source: string): Observable<number>{
    let url: string;
    if (source == undefined || source == 'not specified'){
      url = `${environment.url}/getTotalItems`
    } else {
      url = `${environment.url}/getTotalItems?source=${source}`;
    }
    return this.httpClient.get<number>(url, options);
  }

  public getLogs(pageNum: number, pageSize: number): Observable<Log[]> {
    const url = `${environment.url}/logs?pageNum=${pageNum}&pageSize=${pageSize}`;
    return this.httpClient.get<Log[]>(url, options);
  }

  public getSources(): Observable<string[]> {
    const url = `${environment.url}/sources`;
    return this.httpClient.get<string[]>(url, options);
  }

  public getLogsBySource(source: string, pageNum: number, pageSize: number): Observable<Log[]> {
    const url = `${environment.url}/logs?source=${source}&pageNum=${pageNum}&pageSize=${pageSize}`;
    return this.httpClient.get<Log[]>(url, options);
  }

  public getLogsByDateAndSource(start: string, end: string, source: string, pageNum: number, pageSize: number): Observable<Log[]>{
    let url: string;
    if (source == undefined){
      url = `${environment.url}/logs?start=${start}&end=${end}&pageNum=${pageNum}&pageSize=${pageSize}`;
    } else {
      url = `${environment.url}/logs?start=${start}&end=${end}&source=${source}&pageNum=${pageNum}&pageSize=${pageSize}`;
    }
    return this.httpClient.get<Log[]>(url, options);
  }
}

const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const options = {headers};
