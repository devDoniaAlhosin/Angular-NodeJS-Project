import { Component, Input } from '@angular/core';
import { BooksService } from '../../../core/services/books/books.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})
export class BookViewComponent {
  @Input() id: any;
  books!:any;
  book!:any;
  constructor(
    private booksService: BooksService
  ) {}

  ngOnInit(){
    console.log(this.id);
    this.booksService.getBooks().subscribe((res)=> {
      this.books = res;
      this.book = this.books.find((book: any) => book.bookId == this.id);
      console.log(this.book);
    })
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  onAuthorClick(author: string) {
    console.log(author);
  }
}
