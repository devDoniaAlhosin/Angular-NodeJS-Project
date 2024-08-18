import { AuthService } from './../Services/auth/auth.service';
// role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.authService.getRole();

    if (!this.authService.isLoggedIn()) {
      // User is not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }

    if (this.authService.isLoggedIn() && userRole === expectedRole) {
      // User is logged in and has the expected role
      return true;
    } else {
      if (userRole === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
      return false;
    }
  }
}
