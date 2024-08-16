import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorsServiceService } from '../../../core/services/authors-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Author } from '../../../Shared/models/authorsInterface';
@Component({
  selector: 'app-authors-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authors-table.component.html',
  styleUrl: './authors-table.component.css'
})
export class AuthorsTableComponent {
  // authors: any[] = [];
  // selectedAuthor: any = null;
  authors: Author[] = [];
  selectedAuthor: Author | null = null;
  isAddAuthorModalOpen: boolean = false;
  newAuthor: Author = { _id: '', name: '', image: '', birthDate: new Date() };


  constructor(private authorService: AuthorsServiceService) {}
  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
  }
  openAddAuthorModal(): void {
    this.isAddAuthorModalOpen = true;
  }

  closeAddAuthorModal(): void {
    this.isAddAuthorModalOpen = false;
    this.newAuthor = { _id: '', name: '', image: '', birthDate: new Date() }; // Reset form data
  }

  onAddAuthor(): void {
    this.authorService.addAuthor(this.newAuthor).subscribe(() => {
      this.authors.push(this.newAuthor);
      this.closeAddAuthorModal(); // Close the modal after adding the author
    });
  }

  onUpdate(author: Author): void {
    this.selectedAuthor = { ...author };
  }

  onSubmit(): void {
    if (this.selectedAuthor) {
      this.authorService.updateAuthor(this.selectedAuthor._id, this.selectedAuthor).subscribe(() => {
        this.selectedAuthor = null;
        this.ngOnInit(); // Refresh the list after update
      });
    }
  }

  cancelUpdate(): void {
    this.selectedAuthor = null;
  }

  onDelete(_id: string): void {
    this.authorService.deleteAuthor(_id).subscribe(() => {
      this.authors = this.authors.filter(author => author._id !== _id);
    });
  }
}
  // ngOnInit(): void {
  //   this.getAuthors();
  // }

  // getAuthors(): void {
  //   this.authorService.getAuthors().subscribe(
  //     (data: any[]) => this.authors = data,
  //     (error: HttpErrorResponse) => console.error('Error fetching authors:', error.message)
  //   );
  // }

  // onUpdate(author: any): void {
  //   this.selectedAuthor = { ...author }; // Create a copy to prevent direct mutation
  // }


