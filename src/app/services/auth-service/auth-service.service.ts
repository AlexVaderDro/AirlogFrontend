import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {

  }

  attemtAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    return this._http.post<any>(`${environment.backendUrl}/login`, credentials);
  }

  deleteToken(token: string){
    let url = `${environment.backendUrl}/deleteToken`;
    console.log(url, token);
    this._http.post<any>(url,"\""+token+"\"").subscribe();
  }

  signUp(username: string, password: string): Observable<any>{
    const credentials = {username :username, password: password};
    console.log(username, password)
    console.log('attemptSignUp::');
    return this._http.post<any>(`${environment.backendUrl}/signUp`, credentials);
  }
}
