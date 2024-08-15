import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating:number = 0;
  @Input() readonly: boolean = false;
  setRating(value:number) {
    if(this.readonly){
      return;
    }
    this.rating = value;
  }
}
