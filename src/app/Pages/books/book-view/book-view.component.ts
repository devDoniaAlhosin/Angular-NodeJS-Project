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

  constructor(
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    console.log('User ID in ngOnInit:', this.userId);
    this.booksService.getBooks().subscribe((res) => {
      console.log(res);
      this.books = res;
      this.book = this.books.find((book: any) => book._id == this.id);
      console.log(this.book);
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

  updateBookRatingAndStatus(
    newRating: number | null,
    newStatus: string | null
  ): void {
    if (!this.book || !this.userId) {
      console.error('Book or user ID is not defined.');
      return;
    }

    // Use current values if no new value is provided
    const ratingToUpdate = newRating !== null ? newRating : this.book.rating;
    const statusToUpdate = newStatus !== null ? newStatus : this.selectedStatus;

    console.log(
      'Updating rating:',
      ratingToUpdate,
      'and status:',
      statusToUpdate,
      'for book ID:',
      this.book._id
    );

    this.authService
      .setBookRateAndStatus(
        this.userId,
        this.book._id,
        ratingToUpdate,
        statusToUpdate
      )
      .subscribe(
        (response) => {
          console.log('Rating and status updated successfully', response);
          if (newRating !== null) {
            this.book.rating = ratingToUpdate;
          }
          if (newStatus !== null) {
            this.selectedStatus = statusToUpdate;
          }
        },
        (error) => {
          console.error('Failed to update rating and status', error);
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
          console.log('Rating and status updated successfully', response);
          this.book.rating = newRating;
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

    this.selectedStatus = newStatus;

    this.authService
      .setBookRateAndStatus(
        this.userId,
        this.book._id,
        this.book.rating,
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
