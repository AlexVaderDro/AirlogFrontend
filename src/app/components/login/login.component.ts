import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {AuthService} from '../../services/auth-service/auth.service';
import {TokenStorage} from "../../core/token.storage";
import {TableViewComponent} from "../table-view/table-view.component";

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

  public username: string;
  private password: string;

  private login(): void {
    // TODO delete all console.log
    console.log("login init", this.username, this.password);
    this.authService.attemtAuth(this.username, this.password).subscribe(data => {
      console.log(data.value);
      this.token.saveToken(data.value);
      this.router.navigateByUrl('/table');
      // window.location.reload();
    });
  }

  private signUp() {
    this.router.navigateByUrl("/signup");
  }
}
