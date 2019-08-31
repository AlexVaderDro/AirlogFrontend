import {Component, OnInit} from '@angular/core';
import {TokenStorage} from "../../core/token.storage";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";
import {Router} from "@angular/router";
import {LogService} from "../../services/log-service/log.service";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [TokenStorage]
})
export class HeaderComponent implements OnInit {

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

  // TODO redo it, it's a temporary solution. This method has to check what the component is loaded
  private isUserLogIn(): boolean {
    if(this.router.url === '/login' || this.router.url === '/signup' || this.router.url === '/')
      return false;
    return true;
  }

  private logout(){
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/login');
  }
}
