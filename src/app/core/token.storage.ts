import {Injectable} from '@angular/core';
import {AuthService} from "../services/auth-service/auth.service";
import {Router} from "@angular/router";


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor(private authService: AuthService) {
  }

  signOut() {
    let token = localStorage.getItem(TOKEN_KEY);
    this.authService.deleteToken(token).subscribe(data => {
      console.log(data);
    });
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
  }

  public saveToken(token: string) {
    console.log("removed token", localStorage.getItem("AuthToken"));
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    console.log("new token", localStorage.getItem("AuthToken"));
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
}
