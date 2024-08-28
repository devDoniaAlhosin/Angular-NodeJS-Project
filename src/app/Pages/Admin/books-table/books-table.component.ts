import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../Core/AdminServices/book-services.service';
import { Books } from '../../../Shared/models/booksInterface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css'],
})
export class BooksTableComponent {
  books: Books[] = [];
  selectedBook: Books | null = null;
  isAddBookModalOpen = false;

  // For adding a new book
  newBook: Partial<Books> = {
    title: '',
    genre: [],
    author: [],
    image: '',
  };

  constructor(private booksService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // Load books from the backend
  loadBooks() {
    this.booksService.getBooks().subscribe(
      (data) => {
        this.books = data.map((book: any) => ({
          ...book,
          genre: book.genre.map((g: any) =>
            typeof g === 'object' ? g._id : g
          ),
          author: book.author.map((a: any) =>
            typeof a === 'object' ? a._id : a
          ),
        }));
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  // Open the update form with the selected book
  onUpdate(book: Books): void {
    this.selectedBook = { ...book };
  }

  onSubmitUpdate(): void {
    if (this.selectedBook) {
      console.log(this.selectedBook);
      // Ensure `author` is an array
      if (!Array.isArray(this.selectedBook.author)) {
        if (
          typeof this.selectedBook.author === 'string' ||
          typeof this.selectedBook.author === 'object'
        ) {
          this.selectedBook.author = [this.selectedBook.author];
        } else {
          this.selectedBook.author = [];
        }
      }

      // Ensure `genre` is an array
      if (!Array.isArray(this.selectedBook.genre)) {
        if (
          typeof this.selectedBook.genre === 'string' ||
          typeof this.selectedBook.genre === 'object'
        ) {
          this.selectedBook.genre = [this.selectedBook.genre];
        } else {
          this.selectedBook.genre = [];
        }
      }

      // Convert author and genre to arrays of strings (ObjectIds)
      this.selectedBook.author = this.selectedBook.author.map((a: any) =>
        typeof a === 'string' ? a : a._id
      );
      this.selectedBook.genre = this.selectedBook.genre.map((g: any) =>
        typeof g === 'string' ? g : g._id
      );

      // Call the updateBook service
      this.booksService.updateBook(this.selectedBook).subscribe(
        (res) => {
          console.log('Book updated successfully:', res);
          this.selectedBook = null;
          this.loadBooks();
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

  // Cancel the update
  cancelUpdate() {
    this.selectedBook = null;
  }

  // Delete a book
  onDelete(_id: string | undefined): void {
    if (!_id) {
      console.error('Book ID is undefined, cannot delete.');
      return;
    }
    this.booksService.deleteBook(_id).subscribe(() => {
      this.books = this.books.filter((b) => b._id !== _id);
    });
  }

  // Open modal for adding a new book
  openAddBookModal(): void {
    this.isAddBookModalOpen = true;
  }

  // Close the add book modal
  closeAddBookModal(): void {
    this.isAddBookModalOpen = false;
    this.newBook = {
      title: '',
      genre: [],
      author: [],
      image: '',
    };
  }

  onAddBook(): void {
    // Ensure `author` and `genre` are arrays
    if (typeof this.newBook.author === 'string') {
      this.newBook.author = this.convertToArray(this.newBook.author);
    }
    if (typeof this.newBook.genre === 'string') {
      this.newBook.genre = this.convertToArray(this.newBook.genre);
    }

    this.booksService.addBook(this.newBook as Books).subscribe(
      (response: Books) => {
        console.log('Book added successfully:', response);
        this.books.push(response);
        this.closeAddBookModal();
        this.loadBooks();
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }

  // Convert comma-separated string input to an array of strings
  convertToArray(input: string): string[] {
    return input
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }

  //  isLastGenre method
  isLastGenre(genreId: string): boolean {
    if (this.selectedBook?.genre && this.selectedBook.genre.length) {
      // Directly compare the strings
      return (
        this.selectedBook.genre[this.selectedBook.genre.length - 1] === genreId
      );
    }
    return false; // Default to false if selectedBook or selectedBook.genre is undefined or empty
  }

  // isLastAuthor method
  isLastAuthor(authorId: string): boolean {
    if (this.selectedBook?.author && this.selectedBook.author.length) {
      // Directly compare the strings
      return (
        this.selectedBook.author[this.selectedBook.author.length - 1] ===
        authorId
      );
    }
    return false; // Default to false if selectedBook or selectedBook.author is undefined or empty
  }
}
