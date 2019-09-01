import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  signUp() {
    console.log(this.username, this.password);
    this.authService.signUp(this.username, this.password).subscribe();
    this.goBack();
  }

  goBack(){
    this.router.navigateByUrl("/login");
  }
}
