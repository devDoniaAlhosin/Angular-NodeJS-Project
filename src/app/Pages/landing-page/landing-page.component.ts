import { Component, Renderer2 } from '@angular/core';
import { faAmazon } from '@fortawesome/free-brands-svg-icons/faAmazon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons/faApple';
import { RouterLink } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { AuthorsService } from '../../Core/Services/authors/authors.service';
import { NgFor } from '@angular/common';
import { BooksService } from '../../Core/Services/books/books.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgFor],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  faAmazon = faAmazon;
  faApple = faApple;
  faPlay = faPlay;
  authors: any[] = [];
  books: any[] = [];

  constructor(
    private authorService: AuthorsService,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
      console.log(data);
    });
    this.booksService.getBooks().subscribe((data: any[]) => {
      this.books = data;
      console.log(data);
    });
  }
  getImageByIndex(index: number): string {
    const images = [
      'images/benefits-1.svg',
      'images/benefits-2.svg',
      'images/benefits-6.svg',
    ];
    return images[index % images.length];
  }
  truncateDescription(description: string, limit: number): string {
    if (description.length > limit) {
      return description.substring(0, limit) + '...';
    }
    return description;
  }
}
