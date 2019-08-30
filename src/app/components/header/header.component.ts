import {Component, OnInit} from '@angular/core';
import {TokenStorage} from "../../core/token.storage";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";
import {Router} from "@angular/router";
import {LogService} from "../../services/log-service/log.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [TokenStorage]
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorage: TokenStorage, private router: Router, private logService: LogService) {
    this.logService.getSources();
  }

  ngOnInit() {
  }

  logout(){
    this.tokenStorage.signOut();
    this.router.navigateByUrl("/login");
  }
}
