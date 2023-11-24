import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GeneralUserControllerService } from 'src/app/modules/login/domain/controllers/general-user-controller.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    // private jwtHelper: JwtHelperService,
    private general: GeneralUserControllerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem(environment.storage.token);
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }

    const auth = this.isAuthenticated(token);
    if (!auth) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  private isAuthenticated(token: string) {
    return !this.general.isTokenExpired(token);
    // return !this.jwtHelper.isTokenExpired(token);
  }
}
