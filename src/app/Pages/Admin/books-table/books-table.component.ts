// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// // import { boo } from '../../../core/services/book-services.service';
// import { BookService } from '../../../core/services/book-services.service';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-books-table',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './books-table.component.html',
//   styleUrls: ['./books-table.component.css']
// })
// export class BooksTableComponent {
//   books: any[] = [];
//   selectedBook: any = null;
//   genres: any[] = [];
//   authors: any[] = [];

//   constructor(private bookService: BookService) {}

//   ngOnInit(): void {
//     this.getBooks();

//   }

//   getBooks(): void {
//     this.bookService.getBooks().subscribe(
//       (data: any[]) => this.books = data,
//       (error: HttpErrorResponse) => console.error('Error fetching books:', error.message)
//     );
//   }

//   getGenres(): void {
//     this.bookService.getGenres().subscribe(
//       (data: any[]) => this.genres = data,
//       (error: HttpErrorResponse) => console.error('Error fetching genres:', error.message)
//     );
//   }

//   getAuthors(): void {
//     this.bookService.getAuthors().subscribe(
//       (data: any[]) => this.authors = data,
//       (error: HttpErrorResponse) => console.error('Error fetching authors:', error.message)
//     );
//   }

//   onUpdate(book: any): void {
//     this.selectedBook = { ...book };
//   }

//   cancelUpdate(): void {
//     this.selectedBook = null;
//   }

//   onSubmit(): void {
//     if (this.selectedBook) {
//       this.bookService.updateBook(this.selectedBook.id, this.selectedBook).subscribe(
//         (response: any) => {
//           console.log('Book updated successfully', response);
//           this.selectedBook = null;
//           this.getBooks();
//         },
//         (error: HttpErrorResponse) => console.error('Error updating book:', error.message)
//       );
//     }
//   }
//   onDelete(bookId: string): void {
//     this.bookService.deleteBook(bookId).subscribe(
//       () => this.books = this.books.filter(book => book.id !== bookId),
//       (error: HttpErrorResponse) => console.error('Error deleting book:', error.message)
//     );
//   }


// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book-services.service';
import { Books } from '../../../Shared/models/booksInterface';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent {
  books: Books[] = [];
  selectedBook: Books | null = null;
  isAddBookModalOpen = false;
  isUpdateFormOpen = false;
  newBook: Books = { title: '', image: '', genre: [], author: [] };


  constructor(private booksService: BookService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }
  onUpdate(book: Books) {
    this.selectedBook = { ...book };
    this.isUpdateFormOpen = true;
  }

  onSubmitUpdate() {
    if (this.selectedBook) {
      this.booksService.updateBook(this.selectedBook).subscribe({
        next: () => {
          this.isUpdateFormOpen = false;
          this.loadBooks(); // reload the books after update
        },
        error: (err) => console.error('Error updating book:', err),
      });
    }
  }
  cancelUpdate() {
    this.isUpdateFormOpen = false;
    this.selectedBook = null;
  }

  onDelete(_id: string): void {
    this.booksService.deleteBook(_id).subscribe(() => {
      this.books = this.books.filter(b => b._id !== _id);
    });
  }



  openAddBookModal(): void {
    this.isAddBookModalOpen = true;
  }
  onAddBook() {
    this.booksService.addBook(this.newBook).subscribe({
      next: () => {
        this.isAddBookModalOpen = false;
        this.loadBooks(); // reload the books after adding
      },
      error: (err) => console.error('Error adding book:', err),
    });
  }
  closeAddBookModal(): void {
    this.isAddBookModalOpen = false;
    this.newBook = { _id: '', title: '', image: '', genre: [], author: [] };
  }
    // Method to load books (fetch from the backend)
    loadBooks() {
      this.booksService.getBooks().subscribe((data: Books[]) => {
        this.books = data;
      });
    }
    isLastGenre(genre: { _id: string; name: string }): boolean {
      if (this.selectedBook?.genre && this.selectedBook.genre.length) {
        return this.selectedBook.genre.indexOf(genre) === this.selectedBook.genre.length - 1;
      }
      return false; // Default to false if selectedBook or selectedBook.genre is undefined or empty
    }


    isLastAuthor(author: { _id: string; name: string }): boolean {
      if (this.selectedBook?.author && this.selectedBook.author.length) {
        return this.selectedBook.author.indexOf(author) === this.selectedBook.author.length - 1;
      }
      return false; // Default to false if selectedBook or selectedBook.author is undefined or empty
    }



  }
 // openUpdateForm(book: Books) {
  //   this.selectedBook = { ...book };
  //   this.isUpdateFormOpen = true;
  // }
  // onSubmit(): void {
  //   if (this.selectedBook) {
  //     // Ensure bookData is an object with the required properties
  //     const bookData = {
  //       title: this.selectedBook.title,
  //       image: this.selectedBook.image,
  //       genre: this.selectedBook.genre,
  //       author: this.selectedBook.author
  //     };

  //     this.booksService.updateBook(this.selectedBook._id, bookData).subscribe(() => {
  //       this.selectedBook = null;
  //       this.ngOnInit();
  //     });
  //   }
  // }

  // onSubmit(): void {
  //   if (this.selectedBook) {
  //     this.booksService.updateBook(this.selectedBook).subscribe(() => {
  //       this.selectedBook = null;
  //       this.ngOnInit(); // Refresh the list after update
  //     });
  //   }
  // }
  // onAddBook(): void {
  //   // Ensure genre and author are arrays of objects with _id and name
  //   this.booksService.addBook(this.newBook).subscribe((book) => {
  //     this.books.push(book);
  //     this.closeAddBookModal();
  //   });
  // }



  // Method to close the add book modal
  // closeAddBookModal() {
  //   this.isAddBookModalOpen = false;
  //   this.newBook = { title: '', author: '', genre: '' };
  // }


