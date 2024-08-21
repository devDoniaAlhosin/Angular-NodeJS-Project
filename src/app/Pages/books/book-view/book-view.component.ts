import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, TitleCasePipe } from '@angular/common';
import { BooksService } from '../../../core/services/books/books.service';
import { StarRatingComponent } from '../../../Shared/Components/star-rating/star-rating.component';
import { AuthService } from '../../../Core/Services/auth/auth.service';

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
  constructor(
    private booksService: BooksService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();

    this.booksService.getBooks().subscribe((res) => {
      this.books = res;
      this.book = this.books.find((book: any) => book._id == this.id);
    });
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  onAuthorClick(id: number) {
    this.router.navigate(['authors', this.book.author[0]._id]);
  }

  // Cheeckk AGGAAINN
  onGenreClick(id: number) {
    this.router.navigate(['genre', this.book.genre[0]._id]);
  }

  setStatus(status: string): void {
    if (!this.book || !this.userId) {
      console.error('Book or user ID is not defined.');
      return;
    }

    this.selectedStatus = status;

    this.authService
      .setBookRateAndStatus(
        this.userId,
        this.book._id,
        this.book.rating,
        status
      )
      .subscribe(
        (response) => {
          console.log('Book status updated:', response);
        },
        (error) => {
          console.error('Error updating book status:', error);
        }
      );
  }

  onStatusChange(newStatus: string): void {
    if (!this.book || !this.userId) {
      console.error('Book or user ID is not defined.');
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
          console.error('Failed to update status', error);
        }
      );
  }

  // add this to rating if we're going to use the below function: (ratingChange)="onRatingChange($event)"
  // onRatingChange(newRating: number): void {
  //   console.log('New rating received:', newRating);
  //   if (!this.book || !this.userId) {
  //     console.error('Book or user ID is not defined.');
  //     return;
  //   }

  //   this.authService
  //     .setBookRateAndStatus(
  //       this.userId,
  //       this.book._id,
  //       newRating,
  //       this.selectedStatus
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log('Rating and status updated successfully', response);
  //         this.book.rating = newRating;
  //       },
  //       (error) => {
  //         console.error('Failed to update rating and status', error);
  //       }
  //     );
  // }
}
