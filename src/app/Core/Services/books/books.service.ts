import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = 'http://localhost:3000/api/books';
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<any[]>('http://localhost:3000/api/books');
  }
  // getBookById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/${id}`);
  // }
  getBooksByAuthorId(authorId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?author=${authorId}`);
  }
}
