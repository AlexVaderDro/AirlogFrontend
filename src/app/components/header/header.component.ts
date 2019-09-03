import {Component, OnInit} from '@angular/core';
import {TokenStorage} from "../../core/token.storage";
import {Router} from "@angular/router";
import {LogService} from "../../services/log-service/log.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {Log} from "../../models/log";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [TokenStorage]
})
export class HeaderComponent implements OnInit {
  username = localStorage.getItem('username');

  constructor(
    private tokenStorage: TokenStorage,
    private router: Router,
    private logService: LogService,
    private authService: AuthService
  ) {
    this.logService.getSources();
  }

  ngOnInit() {
  }

  private isUserAuthorized(): boolean {
    if (!this.authService.hasToken()) {
      return false;
    }
    return true;
  }

  private logout() {
    this.tokenStorage.signOut();
    localStorage.removeItem('username');
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.logService.logs = [];
  }
}
