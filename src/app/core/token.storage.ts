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
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
}
