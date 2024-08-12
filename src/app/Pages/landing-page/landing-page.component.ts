import { Component } from '@angular/core';
import { faAmazon } from '@fortawesome/free-brands-svg-icons/faAmazon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons/faApple';
import { RouterLink } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  faAmazon = faAmazon;
  faApple = faApple;
  faPlay = faPlay
}
