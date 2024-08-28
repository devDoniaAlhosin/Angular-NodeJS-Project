import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BooksTableComponent } from '../books-table/books-table.component';
import { AuthorsTableComponent } from '../authors-table/authors-table.component';
import { GenresTableComponent } from '../genres-table/genres-table.component';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    GenresTableComponent,
    AuthorsTableComponent,
    NgFor,
    CommonModule,
    RouterOutlet,
    RouterLink,
    BooksTableComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  selectedTab: string = 'books';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
