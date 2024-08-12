import { AuthService } from './../Services/auth/auth.service';
// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/home']); // Redirect to home if not authorized
      return false;
    }
  }
}
