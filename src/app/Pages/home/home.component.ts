import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { BookService } from './book.service';
import { AuthService } from '../../Core/Services/auth/auth.service';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { AuthorsService } from '../../Core/Services/authors/authors.service';

interface Book {
  book: {
    id: any;
    author: any;
    rating?: number;
    image: string;
    title: string;
    shelf: string;
    status: string;
  };
  author: string[];
  image: string;
  title: string;
  rating: number;
  shelf: string;
  status: string;
  authorNames?: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faCoffee = faCoffee;
  books: Book[] = [];
  filteredBooks: Book[] = [];
  selectedFilter = 'all';
  currentPage = 1;
  itemsPerPage = 3;
  userData: any;
  userId: string | undefined;
  faStar = faStar;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private authorService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserBooks();
  }

  loadUserData(): void {
    this.userData = this.authService.getUserData();
    console.log('User data:', this.userData);

    if (this.userData && this.userData.id) {
      this.userId = this.userData.id;
    } else {
      console.error('User data does not contain an ID');
    }
  }

  loadUserBooks(): void {
    if (this.userId) {
      this.authService.fetchUserBooks(this.userId).subscribe(
        (response: any) => {
          console.log('Full response:', response);

          if (Array.isArray(response)) {
            this.books = response.map((item: any) => {
              const authorArray = Array.isArray(item.book.author)
                ? item.book.author
                : [item.book.author];

              return {
                book: {
                  id: item.book._id,
                  rating: item.book.rating,
                  image: item.book.image,
                  author: authorArray,
                  title: item.book.title,
                  shelf: item.book.shelf,
                  status: item.book.status,
                },
                author: authorArray,
                image: item.book.image,
                title: item.book.title,
                rating: item.rating || 0,
                shelf: item.book.shelf,
                status: item.status || 'not read',
              };
            });

            this.fetchAuthorNames();
            this.filteredBooks = [...this.books];
          } else {
            console.error('Response data is not an array');
            this.books = [];
            this.filteredBooks = [];
          }
          this.resetPagination();
        },
        (error) => {
          console.error('Failed to load user books:', error.message);
          this.books = [];
          this.filteredBooks = [];
        }
      );
    } else {
      console.error('No user ID found');
      this.books = [];
      this.filteredBooks = [];
    }
  }

  fetchAuthorNames(): void {
    this.books.forEach((book) => {
      if (book.author && book.author.length > 0) {
        const authorRequests = book.author.map((authorId) =>
          this.authorService.getAuthorById(authorId).toPromise()
        );

        Promise.all(authorRequests)
          .then((authors) => {
            book.authorNames = authors.map((author: any) => author.name); // Assuming author object has a name property
          })
          .catch((error) => {
            console.error('Failed to load some authors:', error.message);
          });
      }
    });
  }

  get paginatedBooks(): Book[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBooks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  filterBooks(filter: string): void {
    this.selectedFilter = filter;
    if (filter === 'all') {
      this.filteredBooks = [...this.books];
    } else {
      this.filteredBooks = this.books.filter((book) => book.status === filter);
    }
    this.resetPagination();
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  resetPagination(): void {
    this.currentPage = 1;
  }

  getStars(rate: number | undefined): number[] {
    const validRate = rate !== undefined ? rate : 0;

    if (isNaN(validRate) || validRate < 0 || validRate > 5) {
      console.error('Invalid rating:', validRate);
      return [];
    }

    const roundedRate = Math.round(validRate);
    return Array(roundedRate).fill(0);
  }

  getTotalPages(): number {
    return Math.max(
      1,
      Math.ceil(this.filteredBooks.length / this.itemsPerPage)
    );
  }
}
