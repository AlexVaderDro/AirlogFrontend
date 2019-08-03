import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private httpClient: HttpClient) {}

  public getSources(): Observable<string[]> {
    const url = `${environment.url}/sources`;
    return this.httpClient.get<string[]>(url);
  }
}
