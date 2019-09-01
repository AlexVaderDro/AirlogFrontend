import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from "../auth-service/auth-service.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  TOKEN_KEY = 'AuthToken';
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(this.TOKEN_KEY)) {
      console.log('canactivate');
      return true;
    } else {
      console.log('!canactivate');
      this.router.navigateByUrl('login');

      return false;
    }
  }
}
