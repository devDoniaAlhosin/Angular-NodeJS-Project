import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../../Shared/models/genresInterface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenresServiceService {
  private apiUrl = 'http://localhost:3000/api/genres';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  addGenre(genre: Omit<Genre, '_id'>):
   Observable<Genre> {
    return this.http.post<Genre>(this.apiUrl, genre).pipe(
      catchError(error => {
        console.error('Error adding genre:', error);
        return throwError(() => new Error('Error adding genre'));
      })
    );
  }
//test to be like authors
  updateGenre(_id: string, genreData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${_id}`, genreData).pipe(
      catchError(error => {
        console.error('Error updating genre:', error);
        return throwError(() => new Error('Error updating genre'));
      })
    );
  }

  deleteGenre(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${_id}`).pipe(
      catchError(error => {
        console.error('Error deleting genre:', error);
        return throwError(() => new Error('Error deleting genre'));
      })
    );
  }
}
