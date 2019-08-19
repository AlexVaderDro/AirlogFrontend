import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http-service/http.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  cookieValue: string;

  constructor(private httpService: HttpService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
  }

  public setLogin(login: string, password: string) {
    this.httpService.postLogin(login, password).subscribe(cookie => this.cookieValue = cookie);
    this.cookieService.set('Auth-Token', this.cookieValue);
    console.log(this.cookieValue);
  }

  onLoginClick() {
    this.setLogin(this.login, this.password);
    this.router.navigate(['./home']);
  }
}
