import { NgFor } from '@angular/common';
import { BooksService } from './../../../core/services/books/books.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent {
  books!:any;
  constructor(private BooksService: BooksService) {
    this.BooksService.getBooks().subscribe((res)=> {
      this.books = res;
    })
  }


}
