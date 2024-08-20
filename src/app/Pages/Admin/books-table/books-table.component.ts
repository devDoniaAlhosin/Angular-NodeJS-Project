import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book-services.service';
import { Books } from '../../../Shared/models/booksInterface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent {
  books: Books[] = [];
  selectedBook: Books | null = null;

  isAddBookModalOpen = false;
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

  loadBooks(): void {
    this.booksService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onUpdate(book: Books): void {
    this.selectedBook = { ...book };
  }

  onSubmitUpdate(): void {
    if (this.selectedBook) {
      this.booksService.updateBook(this.selectedBook).subscribe(
        (res) => {
          console.log('Book updated successfully:', res);
          this.selectedBook = null;
          this.loadBooks(); // Refresh the list after update
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

  cancelUpdate(): void {
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
    this.newBook = {
      title: '',
      genre: [],
      author: [],
      image: '',
    };
  }

  convertToArray(input: string): { _id: string }[] {
    return input.split(',').map(item => {
      const id = item.trim();
      return id ? { _id: id } : null;
    }).filter(item => item !== null) as { _id: string }[];
  }

  onAddBook(): void {
    if (typeof this.newBook.genre === 'string') {
      this.newBook.genre = this.convertToArray(this.newBook.genre);
    }

    if (typeof this.newBook.author === 'string') {
      this.newBook.author = this.convertToArray(this.newBook.author);
    }

    if (!Array.isArray(this.newBook.genre) || !Array.isArray(this.newBook.author)) {
      console.error('Genre or Author is not an array');
      return;
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

  isLastGenre(genreId: string): boolean {
    if (this.selectedBook?.genre && this.selectedBook.genre.length) {
      return this.selectedBook.genre[this.selectedBook.genre.length - 1]._id === genreId;
    }
    return false;
  }

  isLastAuthor(authorId: string): boolean {
    if (this.selectedBook?.author && this.selectedBook.author.length) {
      return this.selectedBook.author[this.selectedBook.author.length - 1]._id === authorId;
    }
    return false;
  }
}
