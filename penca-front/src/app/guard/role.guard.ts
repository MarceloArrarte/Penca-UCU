import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from '../services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authHelper: AuthHelperService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentRole = this.authHelper.getRole();

    if (!this.authHelper.isAuthenticated()) {
      this.authHelper.navigateToLogin();
      return false;
    }

    if (currentRole !== expectedRole) {
      this.authHelper.navigateToHome();
      return false;
    }

    return true;
  }
}