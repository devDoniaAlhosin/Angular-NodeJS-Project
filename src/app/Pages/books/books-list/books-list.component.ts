import { NgFor } from '@angular/common';
import { BooksService } from './../../../core/services/books/books.service';
import { Component } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [NgFor, NgxPaginationModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent {
  p: number = 1;
  books!:any;
  constructor(
    private BooksService: BooksService,
    private router: Router
  ) {
    this.BooksService.getBooks().subscribe((res)=> {
      this.books = res;
    })
  }

  onProductClick(id:number) {
    this.router.navigate(['/books', id]);
  }

  onAuthorClick(id:number){
    this.router.navigate(['authors', id]);
  }

}
