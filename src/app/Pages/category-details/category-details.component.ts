import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from './single-category.service';
import { forkJoin, Subscription } from 'rxjs';
import { AuthorsService } from '../../Core/Services/authors/authors.service';

export interface Author {
  _id: any;
  name: string;
  bio?: string;
  birthDate?: string;
  nationality?: string;
  image?: string;
  books?: Book[];
}

export interface Book {
  _id: string;
  title: string;
  author: string[];
  description: string;
  image: string;
}

export interface Genre {
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
export class CategoryDetailsComponent implements OnInit {
  categoryName: string = '';
  categoryDescription: string = '';
  popularBooks: Book[] = [];
  authors: { [key: string]: Author } = {};
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.fetchCategoryDetails(categoryId);
    } else {
      console.error('Category ID is missing');
    }
  }

  fetchCategoryDetails(categoryId: string): void {
    this.subscription.add(
      this.bookService.getPopularBooks(categoryId).subscribe({
        next: (data: Genre) => {
          this.categoryName = data.name;
          this.categoryDescription = data.description;

          this.popularBooks = data.books;

          const authorIds = new Set(data.books.flatMap((book) => book.author));
          console.log('Authors Set :', authorIds);

          this.fetchAuthors(Array.from(authorIds));
        },
        error: (error) => {
          console.error('Error fetching category details:', error);
        },
      })
    );
  }

  fetchAuthors(authorIds: string[]): void {
    this.subscription.add(
      forkJoin(
        authorIds.map((id) => this.authorsService.getAuthorById(id))
      ).subscribe({
        next: (authors) => {
          // Create a map from author ID to Author object
          this.authors = authors.reduce((acc, author) => {
            acc[author._id] = author;
            return acc;
          }, {} as { [key: string]: Author });

          // Update popularBooks with Author objects
          this.popularBooks = this.popularBooks.map((book) => ({
            ...book,
            author: book.author.map(
              (authorId) => this.authors[authorId]?.name || 'Unknown'
            ),
          }));
        },
        error: (error) => {
          console.error('Error fetching authors:', error);
        },
      })
    );
  }
  getAuthorIdByName(authorName: string): string | undefined {
    const author = Object.values(this.authors).find(
      (author) => author.name === authorName
    );
    return author?._id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
