import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { BooksService } from '../../../core/services/books/books.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [NgFor, NgIf, NgxPaginationModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent {
  p: number = 1;
  books: any;

  constructor(private booksService: BooksService, private router: Router) {
    this.booksService.getBooks().subscribe((res) => {
      console.log(res);
      this.books = res;
      console.log(this.books);
    });
  }

  onProductClick(id: number) {
    this.router.navigate(['/books', id]);
  }

  onAuthorClick(id: number) {
    this.router.navigate(['authors', id]);
  }
}
