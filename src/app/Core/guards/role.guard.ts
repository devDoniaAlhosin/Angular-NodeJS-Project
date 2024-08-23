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
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      if (route.url[0].path === '') {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }

    if (userRole === 'USER') {
      if (route.url[0].path === '') {
        this.router.navigate(['/home']);
        return false;
      }

      if (route.url[0].path.startsWith('admin')) {
        this.router.navigate(['/']);
        return false;
      }
    }
    if (userRole === 'ADMIN' && route.url[0].path.startsWith('home')) {
      this.router.navigate(['/']);
      return false;
    }

    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
