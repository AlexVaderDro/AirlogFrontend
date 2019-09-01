import {Injectable} from '@angular/core';
import {AuthService} from "../services/auth-service/auth-service.service";
import {Router} from "@angular/router";


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor(private authService: AuthService) {
  }

  signOut() {
    let token = sessionStorage.getItem(TOKEN_KEY);
    this.authService.deleteToken(token).subscribe(data => {
      this.authService.isUserAuthorized = false;
    });
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.clear();
  }

  public saveToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
