import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorage} from "../../core/token.storage";
import {AuthService} from "../../services/auth-service/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TokenStorage, CookieService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorage) { }

  ngOnInit() {
    this.router.navigateByUrl('/table');
  }

  public username: string;
  private password: string;
  private correctCredentials: boolean = true;
  private message: string;

  private login(): void {
    if (this.validate()) {
      this.authService.attemptAuth(this.username, this.password).subscribe(data => {
        if (data.value === 'User not found'){
          this.correctCredentials = false;
          this.message = data.value;
        } else {
          this.tokenStorage.saveToken(data.value);
          this.router.navigateByUrl('/table');
        }
      });
    } else {
      this.correctCredentials = false;
    }
  }

  private refreshUsername() {
    localStorage.removeItem('username');
    localStorage.setItem('username', this.username);
  }

  validate(): boolean {
    if (!this.password) {
      this.message = 'Please, provide your password';
      return false;
    }
    if (!this.username) {
      this.message = 'Please, provide your username';
      return false;
    }
    return true;
  }

  private signUp() {
    this.router.navigateByUrl('/signup');
  }
}
