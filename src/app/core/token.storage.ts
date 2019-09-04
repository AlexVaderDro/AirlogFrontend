import {Injectable} from '@angular/core';
import {AuthService} from "../services/auth-service/auth.service";
import {CookieService} from "ngx-cookie-service";


const TOKEN_KEY = 'token';

@Injectable()
export class TokenStorage {

  constructor(private authService: AuthService, private cookie: CookieService) {
  }

  signOut() {
    let token = this.cookie.get(TOKEN_KEY);
    this.authService.deleteToken(token).subscribe(data => {
    });
    this.cookie.delete(TOKEN_KEY);
  }

  public saveToken(token: string) {
    this.cookie.delete(TOKEN_KEY);
    this.cookie.set(TOKEN_KEY, token);
  }

  public getToken(): string {
    return this.cookie.get(TOKEN_KEY);
  }
}
