import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";


import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {

  }

  hasToken(): boolean{
    if (localStorage.getItem("AuthToken")){
      return true;
    }
    return false;
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attemptAuth ::');
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
    return this._http.post(`${environment.backendUrl}/signUp`, credentials,{responseType: "text"});
  }
}
