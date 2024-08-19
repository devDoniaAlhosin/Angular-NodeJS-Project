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
  newBook: Books = { _id:'',title: '', image: '', genre: [], author: [] };
//openAddBookModal

  constructor(private booksService: BookService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    },
    (error) => {
      console.error('Error fetching books:', error);
    });
  }
  onUpdate(book: Books): void {
    this.selectedBook = { ...book };
    this.isUpdateFormOpen = true;
  }

  onSubmitUpdate(): void {
    if (this.selectedBook) {
      this.booksService.updateBook(this.selectedBook._id, this.selectedBook).subscribe(
        (res) => {
          console.log('Book updated successfully:', res);
          this.selectedBook = null;
          this.isUpdateFormOpen = false;
          this.loadBooks(); // Refresh the list after update
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
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
  closeAddBookModal(): void {
    this.isAddBookModalOpen = false;
    this.newBook = { _id: '', title: '', image: '', genre: [], author: [] };
  }

  onAddBook(): void {
    // Split the comma-separated strings into arrays of objects

    this.newBook.genre = this.newBook.genre.map(genre => ({ _id: genre._id.trim(), name: genre.name }));

    this.newBook.author = this.newBook.author.map(author => ({ _id: author._id.trim(), name: author.name }));


    this.booksService.addBook(this.newBook).subscribe(() => {
      this.books.push(this.newBook);
      this.closeAddBookModal();
      this.loadBooks();
    });
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
