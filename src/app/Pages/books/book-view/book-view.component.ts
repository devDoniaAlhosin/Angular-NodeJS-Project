import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { BooksService } from '../../../core/services/books/books.service';
import { StarRatingComponent } from '../../../Shared/Components/star-rating/star-rating.component';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [StarRatingComponent, NgFor],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})
export class BookViewComponent {
  @Input() id: any;
  books :any;
  book :any;
  constructor(
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(){
    this.booksService.getBooks().subscribe((res)=> {
      this.books = res;
      this.book = this.books.find((book: any) => book._id == this.id);
    })
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  onAuthorClick(id:number){
    this.router.navigate(['authors', id]);
  }

  onGenreClick(id:number){
    this.router.navigate(['genre', id]);
  }
}
