import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;

  @Output() ratingChange = new EventEmitter<number>();

  setRating(newRating: number): void {
    if (!this.readonly) {
      console.log('Setting rating to:', newRating);
      this.rating = newRating;
      this.ratingChange.emit(this.rating);
    }
  }
}
