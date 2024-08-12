import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './Shared/Components/Footer/footer.component';
import { NavbarComponent } from './Shared/Components/Navbar/navbar.component';
import { AuthService } from './Core/Services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('User is already logged in');
    } else {
      console.log('User is not logged in');
    }
  }

  title = 'Angular_Node_Project';
}
