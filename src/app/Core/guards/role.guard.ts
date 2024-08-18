import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './../Services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    if (this.authService.isLoggedIn() && userRole !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
