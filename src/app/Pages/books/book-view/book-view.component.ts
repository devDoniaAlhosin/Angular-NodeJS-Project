import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, TitleCasePipe } from '@angular/common';
import { StarRatingComponent } from '../../../Shared/Components/star-rating/star-rating.component';
import { AuthService } from '../../../Core/Services/auth/auth.service';
import { BooksService } from '../../../Core/Services/books/books.service';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [StarRatingComponent, NgFor, TitleCasePipe],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css',
})
export class BookViewComponent {
  @Input() id: any;
  books: any;
  book: any;
  bookId: string | null = null;
  userId: string | null = null;
  selectedStatus: string = 'not read';
  errorMessage: string | null = null;
  userRating: number = 0;

  constructor(
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    console.log('User ID in ngOnInit:', this.userId);
    this.booksService.getBooks().subscribe((res) => {
      this.books = res;
      this.book = this.books.find((book: any) => book._id == this.id);
      if (this.book && this.userId) {
        this.authService
          .getUserRatingForBook(this.userId, this.book._id)
          .subscribe((userRating) => {
            this.userRating = userRating ?? 0;
          });
      }
    });
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  onAuthorClick(id: number) {
    this.router.navigate(['authors', this.book.author[0]._id]);
  }

  onGenreClick(id: number) {
    this.router.navigate(['/category-details', this.book.genre[0]._id]);
  }

  updateBookDetails(newRating?: number, newStatus?: string): void {
    if (!this.book || !this.userId) {
      this.errorMessage = 'Book or user ID is not defined.';
      return;
    }

    const ratingToUpdate =
      newRating !== undefined ? newRating : this.userRating;
    const statusToUpdate =
      newStatus !== undefined ? newStatus : this.selectedStatus;

    this.authService
      .setBookRateAndStatus(
        this.userId,
        this.book._id,
        ratingToUpdate,
        statusToUpdate
      )
      .subscribe(
        (response) => {
          console.log('Book rating and status updated successfully', response);
          if (newRating !== undefined) {
            this.userRating = ratingToUpdate;
          }
          if (newStatus !== undefined) {
            this.selectedStatus = statusToUpdate;
          }
          this.book.rating = ratingToUpdate;
        },
        (error) => {
          this.errorMessage =
            'Failed to update book details. Please try again.';
          console.error('Failed to update book details', error);
        }
      );
  }

  onRatingChange(newRating: number): void {
    if (!this.book || !this.userId) {
      this.errorMessage = 'Book or user ID is not defined.';
      return;
    }

    this.authService
      .setBookRateAndStatus(
        this.userId,
        this.book._id,
        newRating,
        this.selectedStatus
      )
      .subscribe(
        (response) => {
          console.log('User rating and status updated successfully', response);
          this.userRating = newRating;
        },
        (error) => {
          this.errorMessage =
            'Failed to update rating and status. Please try again.';
          console.error('Failed to update rating and status', error);
        }
      );
  }

  onStatusChange(newStatus: string): void {
    if (!this.book || !this.userId) {
      this.errorMessage = 'Book or user ID is not defined.';
      return;
    }
    const ratingToUse = this.userRating !== undefined ? this.userRating : 0;
    this.selectedStatus = newStatus;

    this.authService
      .setBookRateAndStatus(
        this.userId,
        this.book._id,
        ratingToUse,
        this.selectedStatus
      )
      .subscribe(
        (response) => {
          console.log('Status updated successfully', response);
        },
        (error) => {
          this.errorMessage = 'Failed to update status. Please try again.';
          console.error('Failed to update status', error);
        }
      );
  }
}
