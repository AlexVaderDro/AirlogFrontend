import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth-service/auth.service';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor(private authService: AuthService) { }

  public signOut() {
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    this.authService.deleteToken(token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
