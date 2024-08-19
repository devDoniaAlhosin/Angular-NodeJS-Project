import { Component, OnInit } from '@angular/core';
import { GenreService } from './genres.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Author, Genre } from '../../Shared/Models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Genre[] = [];

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.getGenres().subscribe((data) => {
      this.categories = data;
      console.log('Genre Data ', data);
    });
  }
}
