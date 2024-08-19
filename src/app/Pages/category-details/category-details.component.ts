import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from './single-category.service';
import { Observable } from 'rxjs';

interface Book {
  _id: string;
  title: string;
  author: string[];
  description: string;
  image: string; 

}

interface Genre {
  _id: string;
  name: string;
  description: string;
  books: Book[];
}

@Component({
  standalone: true,
  selector: 'app-category-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent {
  categoryName: string = '';
  categoryDescription: string = ''; 
  popularBooks: Book[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    const categoryId = this.route.snapshot.paramMap.get('id')!;
    this.fetchCategoryDetails(categoryId);
  }

  fetchCategoryDetails(categoryId: string): void {
    this.bookService.getPopularBooks(categoryId).subscribe({
      next: (data: Genre) => {
        this.categoryName = data.name;
        this.categoryDescription = data.description; // Assign description
        this.popularBooks = data.books.map((book: Book) => ({
          _id: book._id,
          title: book.title,
          author: book.author,
          description: book.description,
          image: book.image
        }));
      },
      error: (error) => {
        console.error('Error fetching category details:', error);
      }
    });
  }
}
