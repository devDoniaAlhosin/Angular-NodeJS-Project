import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorsService } from '../../../Core/Services/authors/authors.service';

@Component({
  selector: 'app-authors-list',
  standalone: true,
  imports: [NgFor, NgxPaginationModule],
  templateUrl: './authors-list.component.html',
  styleUrl: './authors-list.component.css',
})
export class AuthorsListComponent {
  p: number = 1;
  authors!: any;
  constructor(private router: Router, private authorsService: AuthorsService) {}

  ngOnInit() {
    this.authorsService.getAuthors().subscribe((res) => {
      this.authors = res;
      console.log(this.authors);
    });
  }

  onProductClick(id: number) {
    this.router.navigate(['/authors', id]);
  }
}
