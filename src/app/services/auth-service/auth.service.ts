import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthorized = this.hasToken();


  get isUserAuthorized(): boolean {
    return this._isUserAuthorized;
  }

  set isUserAuthorized(value: boolean) {
    this._isUserAuthorized = value;
  }

  constructor(private _http: HttpClient) {

  }

  hasToken(): boolean{
    if (localStorage.getItem("AuthToken")){
      return true;
    }
    return false;
  }

  attemtAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    return this._http.post<any>(`${environment.backendUrl}/login`, credentials);
  }

  deleteToken(token: string): Observable<string> {
    let url = `${environment.backendUrl}/deleteToken`;
    console.log(url, token);
    return this._http.post<string>(url, token);
  }

  signUp(username: string, password: string): Observable<any>{
    const credentials = {username :username, password: password};
    console.log(username, password);
    console.log('attemptSignUp::');
    return this._http.post<any>(`${environment.backendUrl}/signUp`, credentials);
  }
}
