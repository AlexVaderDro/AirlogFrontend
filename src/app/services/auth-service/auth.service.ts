import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _username: string;


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  constructor(private _http: HttpClient) {}

  hasToken(): boolean{
    if (localStorage.getItem('AuthToken')){
      return true;
    }
    return false;
  }

  attemptAuth(username: string, password: string): Observable<any> {
    this.username = username;
    const credentials = {username: username, password: password};
    return this._http.post<any>(`${environment.backendUrl}/login`, credentials);
  }

  deleteToken(token: string): Observable<string> {
    let url = `${environment.backendUrl}/deleteToken`;
    return this._http.post<string>(url, token);
  }

  signUp(username: string, password: string): Observable<any>{
    const credentials = {username :username, password: password};
    return this._http.post(`${environment.backendUrl}/signUp`, credentials,{responseType: 'text'});
  }
}
