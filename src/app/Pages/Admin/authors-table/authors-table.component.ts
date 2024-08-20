import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorsServiceService } from '../../../core/AdminServices/authors-service.service';
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
  authors: Author[] = [];
  selectedAuthor: Author | null = null;
  isAddAuthorModalOpen: boolean = false;
  newAuthor: Partial<Author> = {
    name: '',
    bio: '',
    nationality: '',
    image: '',
    birthDate: '',
  };
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
    this.newAuthor = {
      name: '',
      bio: '',
      nationality: '',
      image: '',
      birthDate: ''

    };
  }

  onAddAuthor(): void {
    console.log('Adding author:', this.newAuthor);

    // Omit the _id when sending the data to the service
    this.authorService.addAuthor(this.newAuthor as Omit<Author, '_id'>).subscribe(
      (response: Author) => {
        console.log('Author added successfully:', response);
        this.authors.push(response);
        this.closeAddAuthorModal();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding author:', error);
      }
    );
  }

// update form
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
//delete
  onDelete(_id: string): void {
    this.authorService.deleteAuthor(_id).subscribe(() => {
      this.authors = this.authors.filter(author => author._id !== _id);
    });
  }
}


