import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private httpClient: HttpClient) {}

  public getLogs(): Observable<Log[]> {
    const url = `${environment.url}/logs`;
    return this.httpClient.get<Log[]>(url, options);
  }

  public getLogsBySource(source: string): Observable<Log[]>{
    const url = `${environment.url}/logs?source=`+source;
    console.log(url);
    return this.httpClient.get<Log[]>(url, options);
  }
}

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const options = { headers };
