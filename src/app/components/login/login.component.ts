import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service/auth-service.service";
import {TokenStorage} from "../../core/token.storage";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TokenStorage]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) { }

  ngOnInit() {
  }

  username: string;
  password: string;

  login(): void {
    console.log("login init", this.username, this.password);
    this.authService.attemtAuth(this.username, this.password).subscribe(data => {
      console.log(data.value);
      this.token.saveToken(data.value);
      this.router.navigateByUrl("/text");
    });
  }
}
