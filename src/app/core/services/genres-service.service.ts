import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenresServiceService {

  private apiUrl = 'http://localhost:3000/api/genres'; // Adjust according to your backend URL

  constructor(private http: HttpClient) { }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getGenreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateGenre(id: string, genre: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, genre);
  }


  deleteGenre(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
