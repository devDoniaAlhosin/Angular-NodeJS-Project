import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresServiceService } from '../../../core/services/genres-service.service';
import { Genre } from '../../../Shared/models/genresInterface';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-genres-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './genres-table.component.html',
  styleUrl: './genres-table.component.css'
})
export class GenresTableComponent {
  genres: Genre[] = [];
  selectedGenre: Genre | null = null;

  constructor(private genresService: GenresServiceService ) {}

  // ngOnInit(): void {
  //   this.genresService.getGenres().subscribe((res) => {
  //     this.genres = res;
  //   });
  // }

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
  onUpdate(genre: Genre): void {
    this.selectedGenre = { ...genre };
  }

  onDelete(id: string): void {
    this.genresService.deleteGenre(id).subscribe(() => {
      this.genres = this.genres.filter(g => g.id !== id.toString());
    });
  }


  onSubmit(): void {
    if (this.selectedGenre) {
      this.genresService.updateGenre(this.selectedGenre.id, this.selectedGenre).subscribe(() => {
        this.selectedGenre = null;
        this.ngOnInit(); // Refresh the list after update
      });
    }
  }
  cancelUpdate(): void {
    this.selectedGenre = null;
  }
}
