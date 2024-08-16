// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { GenresServiceService } from '../../../core/services/genres-service.service';
// // import { Genre } from '../../../Shared/models/genresInterface';
// // import { FormsModule } from '@angular/forms';
// // @Component({
// //   selector: 'app-genres-table',
// //   standalone: true,
// //   imports: [CommonModule,FormsModule],
// //   templateUrl: './genres-table.component.html',
// //   styleUrl: './genres-table.component.css'
// // })
// // export class GenresTableComponent {
// //   genres: Genre[] = [];
// //   selectedGenre: Genre | null = null;

// //   constructor(private genresService: GenresServiceService ) {}
// //   ngOnInit(): void {
// //     this.genresService.getGenres().subscribe(
// //       (res) => {
// //         this.genres = res;
// //       },
// //       (error) => {
// //         console.error('Error fetching genres:', error);
// //       }
// //     );
// //   }
// //   onUpdate(genre: Genre): void {
// //     this.selectedGenre = { ...genre };
// //   }

// //   onDelete(_id: string): void {
// //     this.genresService.deleteGenre(_id).subscribe(() => {
// //       this.genres = this.genres.filter(g => g._id !== _id);
// //     });
// //   }


// //   onSubmit(): void {
// //     if (this.selectedGenre) {
// //       this.genresService.updateGenre(this.selectedGenre._id, this.selectedGenre).subscribe(() => {
// //         this.selectedGenre = null;
// //         this.ngOnInit(); // Refresh the list after update
// //       });
// //     }
// //   }
// //   cancelUpdate(): void {
// //     this.selectedGenre = null;
// //   }
// // }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { GenresServiceService } from '../../../core/services/genres-service.service';
// import { Genre } from '../../../Shared/models/genresInterface';

// @Component({
//   selector: 'app-genres-table',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './genres-table.component.html',
//   styleUrls: ['./genres-table.component.css']
// })
// export class GenresTableComponent {
//   genres: Genre[] = [];
//   // selectedGenre: Genre | null = null;
//   // isAddGenreModalOpen: boolean = false;
//   isUpdateFormOpen = false;
//   isAddGenreModalOpen = false;
//   // newGenre: Genre = { _id: '', name: '' };
//   selectedItem: Genre | null = null;  // Ensure it's either null or an instance of Genre
//   newGenre: Genre = { _id: '', name: '' };
//   // selectedItem: any = { name: '', image: '', birthDate: '' };
//   constructor(private genresService: GenresServiceService) {}

//   ngOnInit(): void {
//     this.genresService.getGenres().subscribe(
//       (res) => {
//         this.genres = res;
//       },
//       (error) => {
//         console.error('Error fetching genres:', error);
//       }
//     );
//   }

//   openAddGenreModal(): void {
//     this.isAddGenreModalOpen = true;
//   }

//   closeAddGenreModal(): void {
//     this.isAddGenreModalOpen = false;
//     this.newGenre = { _id: '', name: '' }; // Reset form data
//   }

//   onAddGenre(): void {
//     this.genresService.addGenre(this.newGenre).subscribe(() => {
//       this.genres.push(this.newGenre);
//       this.closeAddGenreModal();
//         this.ngOnInit();
//     });
//   }

//   onUpdate(genre: Genre): void {
//     this.selectedItem = { ...genre };
//     // this.isUpdateFormOpen = true;
//   }

//   onDelete(_id: string): void {
//     this.genresService.deleteGenre(_id).subscribe(() => {
//       this.genres = this.genres.filter(g => g._id !== _id);
//     });
//   }

//   onSubmitUpdate(): void {
//     if (this.selectedItem) {
//       this.genresService.updateGenre(this.selectedItem._id, this.selectedItem).subscribe(() => {
//         this.selectedItem = null;
//         this.isUpdateFormOpen = false;
//         this.ngOnInit(); // Refresh the list after update
//       });
//     }
//   }
//   // onSubmit(): void {
//   //   if (this.selectedItem) {
//   //     this.genresService.updateGenre(this.selectedItem._id, this.selectedItem).subscribe(() => {
//   //       this.selectedItem = null;
//   //       this.isUpdateFormOpen = false;
//   //       this.ngOnInit();

//   //     });
//   //   }
//   // }

//   cancelUpdate(): void {
//     this.selectedItem = null;
//     this.isUpdateFormOpen = false;
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenresServiceService } from '../../../core/services/genres-service.service';
import { Genre } from '../../../Shared/models/genresInterface';

@Component({
  selector: 'app-genres-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './genres-table.component.html',
  styleUrls: ['./genres-table.component.css']
})
export class GenresTableComponent {
  genres: Genre[] = [];
  selectedItem: Genre | null = null;  // Holds the selected genre for updating
  isUpdateFormOpen = false;
  isAddGenreModalOpen = false;
  newGenre: Genre = { _id: '', name: '' };

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
    this.newGenre = { _id: '', name: '' }; // Reset form data
  }

  onAddGenre(): void {
    this.genresService.addGenre(this.newGenre).subscribe(() => {
      this.genres.push(this.newGenre);
      this.closeAddGenreModal();
      this.ngOnInit();
    });
  }

  onUpdate(genre: Genre): void {
    this.selectedItem = { ...genre };
    this.isUpdateFormOpen = true;
  }

  onDelete(_id: string): void {
    this.genresService.deleteGenre(_id).subscribe(() => {
      this.genres = this.genres.filter(g => g._id !== _id);
    });
  }

  onSubmitUpdate(): void {
    if (this.selectedItem) {
      this.genresService.updateGenre(this.selectedItem._id, this.selectedItem).subscribe(
        (res) => {
          console.log('Genre updated successfully:', res); // Debugging line
          this.selectedItem = null;
          this.isUpdateFormOpen = false;
          this.ngOnInit(); // Refresh the list after update
        },
        (error) => {
          console.error('Error updating genre:', error); // Handle errors
        }
      );
    }
  }
  cancelUpdate(): void {
    this.selectedItem = null;
    this.isUpdateFormOpen = false;
  }
}
