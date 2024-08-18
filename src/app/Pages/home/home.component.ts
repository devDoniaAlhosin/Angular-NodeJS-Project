import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { BookService } from './book.service';

interface Book {
  image:string;
  title: string;
  author: string;
  avgRate: number;
  rating: number;
  shelf: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faCoffee = faCoffee;
  books: Book[] = [];
  filteredBooks: Book[] = [];
  selectedFilter = 'all';
  currentPage = 1;
  itemsPerPage = 3;

  constructor(private bookService: BookService) {
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('Attempting to load books...');
    this.bookService.fetchBooks().subscribe(
      (data) => {
        console.log('Books loaded successfully:', data);
        this.books = data;
        this.filteredBooks = data;
        this.resetPagination();
      },
      (error) => {
        console.error('Failed to load books:', error.message);
        alert('Error loading books. Please try again later.');
      }
    );
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
      this.filteredBooks = this.books.filter(book => book.shelf === filter);
    }
    this.resetPagination();
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  resetPagination(): void {
    this.currentPage = 1;
  }

  getStars(rate: number): number[] {
    return Array(rate).fill(0);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
  }
}
