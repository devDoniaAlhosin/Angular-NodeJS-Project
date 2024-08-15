import { Component, Input } from '@angular/core';
import { AuthorsService } from '../../../core/services/authors/authors.service';

@Component({
  selector: 'app-author-view',
  standalone: true,
  imports: [],
  templateUrl: './author-view.component.html',
  styleUrl: './author-view.component.css',
})
export class AuthorViewComponent {
  @Input() id: any;
  author!: any;
  authors!: any;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit() {
    this.authorsService.getAuthors().subscribe((res) => {
      this.authors = res;
      this.author = this.authors.find((author: any) => author._id == this.id);
      console.log(this.author)
    });
  }

  getStarArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  onAuthorClick(author: string) {
    console.log(author);
  }
}
