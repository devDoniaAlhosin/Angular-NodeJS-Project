import { Component, Input } from '@angular/core';
import { AuthorsService } from '../../../Core/Services/authors/authors.service';
import { DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { BooksService } from '../../../Core/Services/books/books.service';
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
  bookId?: string | null;
  userId: string | null = null;
  selectedStatus: string = 'not read';
  errorMessage: string | null = null;
  userRating: number = 0;

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('AuthorViewComponent constructor');
  }

  // ngOnInit() {
  //   this.userId = this.authService.getUserId();
  //   if (!this.userId) {
  //     console.error('User ID is not defined');
  //     return;
  //   }

  //   if (this.id) {
  //     this.authorsService.getAuthorById(this.id).subscribe(
  //       (res) => {
  //         this.author = res;
  //       },
  //       (error) => {
  //         console.error('Error fetching author data:', error);
  //       }
  //     );

  //     this.booksService.getBooksByAuthorId(this.id).subscribe((booksRes) => {
  //       this.books = booksRes;

  //       this.books.forEach((book) => {
  //         if (book._id) {
  //           this.authService
  //             .getUserRatingForBook(this.userId, book._id as string)
  //             .subscribe(
  //               (userRating) => {
  //                 this.userRating = userRating ?? 0;
  //               },
  //               (error) => {
  //                 console.error('Error fetching user rating for book:', error);
  //               }
  //             );
  //         } else {
  //           console.error('Book ID is null');
  //         }
  //       });
  //     });
  //   } else {
  //     console.error('Author ID is undefined');
  //   }
  // }
  ngOnInit() {
    console.log('AuthorViewComponent initialized');
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      console.error('User ID is not defined');
      return;
    }

    if (this.id) {
      this.authorsService.getAuthorById(this.id).subscribe(
        (res) => {
          this.author = res;
          console.log('Author data fetched:', this.author);
        },
        (error) => {
          console.error('Error fetching author data:', error);
        }
      );

      this.booksService.getBooksByAuthorId(this.id).subscribe((booksRes) => {
        this.books = booksRes;
        console.log('Books data fetched:', this.books);

        this.books.forEach((book) => {
          if (book._id) {
            this.authService
              .getUserRatingForBook(this.userId, book._id as any)
              .subscribe(
                (userBooks: any) => {
                  userBooks?.forEach((userBook: any) => {
                    // Find the corresponding book in the author.books array
                    const matchingBook = this.author.books.find(
                      (book: any) => book._id === userBook.book._id
                    );

                    if (matchingBook) {
                      // Update the matching book's userRating and status
                      matchingBook.userRating = userBook.rating;
                      matchingBook.status = userBook.status;
                      console.log(
                        `User rating for book "${matchingBook.title}" (ID: ${matchingBook._id}):`,
                        matchingBook.userRating
                      );
                    }
                  });
                },
                (error) => {
                  console.error(
                    `Error fetching user rating for book "${book.title}" (ID: ${book._id}):`,
                    error
                  );
                }
              );
          } else {
            console.error('Book ID is null');
          }
        });
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
  updateBookDetails(
    bookId: string,
    newRating?: number,
    newStatus?: string
  ): void {
    console.log('Updating book details:', bookId, newRating, newStatus);

    if (!this.userId) {
      this.errorMessage = 'User ID is not defined.';
      return;
    }

    const bookToUpdate = this.books.find((book) => book._id === bookId);
    if (!bookToUpdate) {
      this.errorMessage = 'Book not found.';
      return;
    }

    const ratingToUpdate =
      newRating !== undefined ? newRating : bookToUpdate.userRating ?? 0;
    const statusToUpdate =
      newStatus !== undefined ? newStatus : bookToUpdate.status ?? 'not read';

    this.authService
      .setBookRateAndStatus(
        this.userId,
        bookToUpdate._id,
        ratingToUpdate,
        statusToUpdate
      )
      .subscribe(
        (response) => {
          console.log('Book rating and status updated successfully', response);
          bookToUpdate.userRating = ratingToUpdate;
          bookToUpdate.status = statusToUpdate;
        },
        (error) => {
          this.errorMessage =
            'Failed to update book details. Please try again.';
          console.error('Failed to update book details', error);
        }
      );
  }

  onRatingChange(bookId: string, newRating: number): void {
    const matchingBook = this.author.books.find(
      (book: { _id: string }) => book._id === bookId
    );

    if (!matchingBook || !this.userId) {
      this.errorMessage = 'Book or user ID is not defined.';
      return;
    }

    const statusToUse = matchingBook.status || 'not read'; // Use a default status if none is set

    this.authService
      .setBookRateAndStatus(this.userId, bookId, newRating, statusToUse)
      .subscribe(
        (response) => {
          console.log(
            `User rating and status updated successfully for book "${matchingBook.title}" (ID: ${matchingBook._id}):`,
            response
          );
          matchingBook.userRating = newRating;
        },
        (error) => {
          this.errorMessage =
            'Failed to update rating and status. Please try again.';
          console.error('Failed to update rating and status', error);
        }
      );
  }

  onStatusChange(bookId: string, newStatus: string): void {
    const matchingBook = this.author.books.find(
      (book: { _id: string }) => book._id === bookId
    );

    if (!matchingBook || !this.userId) {
      this.errorMessage = 'Book or user ID is not defined.';
      return;
    }

    const ratingToUse =
      matchingBook.userRating !== undefined ? matchingBook.userRating : 0;

    this.authService
      .setBookRateAndStatus(this.userId, bookId, ratingToUse, newStatus)
      .subscribe(
        (response) => {
          console.log(
            `Status updated successfully for book "${matchingBook.title}" (ID: ${matchingBook._id}):`,
            response
          );
          matchingBook.status = newStatus;
        },
        (error) => {
          this.errorMessage = 'Failed to update status. Please try again.';
          console.error('Failed to update status', error);
        }
      );
  }
}
