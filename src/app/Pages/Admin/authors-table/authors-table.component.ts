import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorsServiceService } from '../../../core/services/authors-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authors-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authors-table.component.html',
  styleUrl: './authors-table.component.css'
})
export class AuthorsTableComponent {
  authors: any[] = [];
  selectedAuthor: any = null;

  constructor(private authorService: AuthorsServiceService) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (data: any[]) => this.authors = data,
      (error: HttpErrorResponse) => console.error('Error fetching authors:', error.message)
    );
  }

  onUpdate(author: any): void {
    this.selectedAuthor = { ...author }; // Create a copy to prevent direct mutation
  }

  cancelUpdate(): void {
    this.selectedAuthor = null;
  }

  onSubmit(): void {
    if (this.selectedAuthor) {
      this.authorService.updateAuthor(this.selectedAuthor.id, this.selectedAuthor).subscribe(
        (response: any) => {
          console.log('Author updated successfully', response);
          this.selectedAuthor = null;
          this.getAuthors(); // Refresh the list after update
        },
        (error: HttpErrorResponse) => console.error('Error updating author:', error.message)
      );
    }
  }

  onDelete(authorId: string): void {
    this.authorService.deleteAuthor(authorId).subscribe(
      () => this.authors = this.authors.filter(author => author.id !== authorId),
      (error: HttpErrorResponse) => console.error('Error deleting author:', error.message)
    );
  }
}
