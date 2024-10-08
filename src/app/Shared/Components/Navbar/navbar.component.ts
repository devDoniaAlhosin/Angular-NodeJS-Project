import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { AuthService } from '../../../Core/Services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgIf, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  username: string | null = null;
  constructor(private authService: AuthService, private router: Router) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.authService.username$.subscribe((username) => {
      this.username = username;
    });
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Log out the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  // Navigate based on user role
  navigateBasedOnRole(): void {
    const role = this.authService.getRole();
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'USER') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
