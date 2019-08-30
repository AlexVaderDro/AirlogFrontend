import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../auth-service/auth-service.service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  TOKEN_KEY = 'AuthToken';
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (window.sessionStorage.getItem(this.TOKEN_KEY) != undefined) {
      console.log("canactivate");
      return true;
    } else {
      console.log("!canactivate");
      this.router.navigateByUrl('login');

      return false;
    }
  }
}
