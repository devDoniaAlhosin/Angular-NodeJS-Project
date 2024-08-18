import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './Shared/Components/Footer/footer.component';
import { NavbarComponent } from './Shared/Components/Navbar/navbar.component';
import { AuthService } from './Core/Services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService
        .checkUserExistence(userId)
        .pipe(
          catchError((error) => {
            console.error('Error checking user existence', error);
            this.authService.logout();
            return of(false);
          })
        )
        .subscribe((exists) => {
          if (!exists) {
            this.authService.logout();
            this.router.navigate(['/']);
          } else {
            if (this.authService.isLoggedIn()) {
              const role = this.authService.getRole();
              if (role === 'ADMIN') {
                this.router.navigate(['/admin']);
              } else if (role === 'USER') {
                this.router.navigate(['/home']);
              } else {
                this.router.navigate(['/']);
              }
            } else {
              this.router.navigate(['/']);
            }
          }
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  title = 'Angular_Node_Project';
}
