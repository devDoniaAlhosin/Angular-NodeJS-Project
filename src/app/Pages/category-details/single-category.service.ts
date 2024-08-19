import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre, Book } from '../../Shared/Models/models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:3000/api/genres';

  constructor(private http: HttpClient) {}

  getPopularBooks(categoryId: string): Observable<Genre> {
    return this.http.get<Genre>(`${this.baseUrl}/${categoryId}`);
  }
}
