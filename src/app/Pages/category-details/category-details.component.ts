import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from './single-category.service'; // Import the service
import { Observable } from 'rxjs';

interface Book {
  name:string;
  author: string;
  rating: number;
  description:string;

}

@Component({
  standalone: true,
  selector: 'app-category-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent {
  categoryName: string;
  popularBooks: Book[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.categoryName = this.route.snapshot.paramMap.get('category')!;
    this.fetchPopularBooks();
  }

  fetchPopularBooks(): void {
    this.bookService.getPopularBooks().subscribe({
      next: (data) => {
        this.popularBooks = data;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }
}
