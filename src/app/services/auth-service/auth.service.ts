import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {}

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this._http.post<any>(`${environment.backendUrl}/login`, credentials);
  }

  deleteToken(token: string): Observable<string> {
    let url = `${environment.backendUrl}/deleteToken`;
    return this._http.post(url, token, {responseType: 'text'});
  }

  signUp(username: string, password: string): Observable<any>{
    const credentials = {username :username, password: password};
    return this._http.post(`${environment.backendUrl}/signUp`, credentials,{responseType: 'text'});
  }
}
