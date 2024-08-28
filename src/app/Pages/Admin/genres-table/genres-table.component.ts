import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenresServiceService } from '../../../Core/AdminServices/genres-service.service';
import { Genre } from '../../../Shared/models/genresInterface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-genres-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './genres-table.component.html',
  styleUrls: ['./genres-table.component.css'],
})
export class GenresTableComponent {
  genres: Genre[] = [];
  selectedItem: Genre | null = null;
  // isUpdateFormOpen = false;
  isAddGenreModalOpen = false;
  newGenre: Partial<Genre> = {
    name: '',
  };

  constructor(private genresService: GenresServiceService) {}

  ngOnInit(): void {
    this.genresService.getGenres().subscribe(
      (res) => {
        this.genres = res;
      },
      (error) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  openAddGenreModal(): void {
    this.isAddGenreModalOpen = true;
  }

  closeAddGenreModal(): void {
    this.isAddGenreModalOpen = false;
    this.newGenre = { name: '' };
  }

  onAddGenre(): void {
    console.log('Adding genre:', this.newGenre);

    this.genresService.addGenre(this.newGenre as Omit<Genre, '_id'>).subscribe(
      (res: Genre) => {
        console.log('Genre added successfully', res);
        this.genres.push(res);
        this.closeAddGenreModal();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding genre:', error);
      }
    );
  }
  onUpdate(genre: Genre): void {
    this.selectedItem = { ...genre };
    // this.isUpdateFormOpen = true;
  }

  onDelete(_id: string): void {
    this.genresService.deleteGenre(_id).subscribe(() => {
      this.genres = this.genres.filter((g) => g._id !== _id);
    });
  }

  // onSubmitUpdate(): void {
  //   if (this.selectedItem) {
  //     this.genresService.updateGenre(this.selectedItem._id, this.selectedItem).subscribe(
  //       (res :Genre) => {
  //         console.log('Genre updated successfully:', res);
  //         this.selectedItem = null;
  //         this.isUpdateFormOpen = false;
  //         this.ngOnInit();
  //       },
  //       (error) => {
  //         console.error('Error updating genre:', error);
  //       }
  //     );
  //   }
  // }
  onSubmitUpdate(): void {
    if (this.selectedItem) {
      this.genresService
        .updateGenre(this.selectedItem._id, this.selectedItem)
        .subscribe(
          (res: Genre) => {
            console.log('Genre updated successfully:', res);
            this.selectedItem = null;
            // this.isUpdateFormOpen = false;
            this.ngOnInit();
          },
          (error) => {
            console.error('Error updating genre:', error);
          }
        );
    }
  }
  cancelUpdate(): void {
    this.selectedItem = null;
  }
}
