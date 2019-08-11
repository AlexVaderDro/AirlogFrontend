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

  public getLogs(): Observable<Log[]> {
    const url = `${environment.url}/logs`;
    return this.httpClient.get<Log[]>(url, options);
  }

  public getSources(): Observable<string[]> {
    const url = `${environment.url}/sources`;
    return this.httpClient.get<string[]>(url, options);
  }

  public getLogsBySource(source: string): Observable<Log[]> {
    const url = `${environment.url}/logs?source=${source}`;
    return this.httpClient.get<Log[]>(url, options);
  }

  public getLogsByDateAndSource(date: string, source: string): Observable<Log[]>{
    const url = `${environment.url}/logs?dateTime=${date}&source=${source}`;
    console.log(url);
    return this.httpClient.get<Log[]>(url, options);
  }
}

const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const options = {headers};
