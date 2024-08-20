import { Component, Input } from '@angular/core';
import { AuthorsService } from '../../../core/services/authors/authors.service';
import { DatePipe } from '@angular/common';
import { BooksService } from '../../../Core/Services/books/books.service';

@Component({
  selector: 'app-author-view',
  standalone: true,
  imports: [],
  templateUrl: './author-view.component.html',
  styleUrl: './author-view.component.css',
  providers: [DatePipe],
})
export class AuthorViewComponent {
  @Input() id: string | undefined;
  author: any;
  authors!: any;
  books: any[] = [];

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    if (this.id) {
      console.log(this.id);
      this.authorsService.getAuthorById(this.id).subscribe(
        (res) => {
          this.author = res;
          console.log(this.author);
        },
        (error) => {
          console.error('Error fetching author data:', error);
        }
      );
      this.booksService.getBooksByAuthorId(this.id).subscribe((booksRes) => {
        this.books = booksRes;
        console.log('Books of The author ', this.books); //list of books
      });
    } else {
      console.error('Author ID is undefined');
    }
  }
  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'fullDate');
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  onAuthorClick(author: string) {
    console.log(author);
  }
}
