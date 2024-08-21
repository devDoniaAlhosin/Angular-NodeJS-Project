import { Component, Input } from '@angular/core';
import { AuthorsService } from '../../../core/services/authors/authors.service';
import { DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { BooksService } from '../../../core/services/books/books.service';
import { StarRatingComponent } from '../../../Shared/Components/star-rating/star-rating.component';
import { AuthService } from '../../../Core/Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-view',
  standalone: true,
  imports: [NgFor, StarRatingComponent, TitleCasePipe],
  templateUrl: './author-view.component.html',
  styleUrl: './author-view.component.css',
  providers: [DatePipe],
})
export class AuthorViewComponent {
  @Input() id: string | undefined;
  author: any;
  authors!: any;
  books: any[] = [];
  book: any;
  bookId: string | null = null;
  userId: string | null = null;
  selectedStatus: string = 'not read';

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.authorsService.getAuthorById(this.id).subscribe(
        (res) => {
          this.author = res;
        },
        (error) => {
          console.error('Error fetching author data:', error);
        }
      );
      this.booksService.getBooksByAuthorId(this.id).subscribe((booksRes) => {
        this.books = booksRes;
      });
    } else {
      console.error('Author ID is undefined');
    }
  }
  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'fullDate');
  }

  onProductClick(bookId: string) {
    this.router.navigate(['books', bookId]);
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

  // add this to rating html if we're going to use the below function:  (ratingChange)="onRatingChange($event)"
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
