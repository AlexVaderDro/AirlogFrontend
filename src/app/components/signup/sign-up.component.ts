import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  private username: string;
  private password: string;
  private confPassword: string;
  private message: string = '';
  private correctCredentials: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  signUp() {
    console.log(this.username, this.password, this.confPassword);
    if (this.validate()) {
      this.authService.signUp(this.username, this.password).subscribe(data => {
        if (data == 'User has signed up!') {
          console.log(data);
          this.goBack();
        } else {
          this.correctCredentials = false;
          this.message = data;
        }
      });
    } else this.correctCredentials = false;
  }

  goBack() {
    this.router.navigateByUrl("/login");
  }

  validate(): boolean{
    if (!this.username) {
      this.message = "Invalid username \n";
      return false;
    }
    if (!this.password) {
      this.message = "Enter the password \n";
      return false;
    }
    if (this.password.length < 8){
      this.message = "Password length must be more than 8 characters"
      return false;
    }
    if (!(this.password === this.confPassword)){
      this.message = "Passwords don't match!";
      return false;
    }
    return true;
  }
}
