import { Component, OnInit } from '@angular/core';
import { GenreService } from './genres.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  standalone:true,
  imports:[RouterModule , CommonModule] ,
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe((data) => {
      this.categories = data;
    });
  }
}
