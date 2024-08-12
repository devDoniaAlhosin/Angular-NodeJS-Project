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
  username: string;
  constructor(private authService: AuthService, private router: Router) {
    this.username = this.authService.getUsername();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Log out the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
