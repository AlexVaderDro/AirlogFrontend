import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get<Log[]>(url);
  }

  /*public getLogs(): Observable<string> {
    const url = `${environment.url}/logs`;
    return this.httpClient.get<string>(url);
  }*/
}
