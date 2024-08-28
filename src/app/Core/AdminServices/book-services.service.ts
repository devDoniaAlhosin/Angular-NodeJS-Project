import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Books } from '../../Shared/models/booksInterface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://node-js-server-side.vercel.app/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(() => new Error('Error fetching books'));
      })
    );
  }
  updateBook(book: Books): Observable<Books> {
    return this.http.patch<Books>(`${this.apiUrl}/${book._id}`, book);
  }

  addBook(book: Omit<Books, '_id'>): Observable<Books> {
    return this.http.post<Books>(this.apiUrl, book).pipe(
      catchError((error) => {
        console.error('Error adding book:', error);
        return throwError('Error adding book');
      })
    );
  }
  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://node-js-server-side.vercel.app/api/genres'
    );
  }

  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://node-js-server-side.vercel.app/api/authors'
    );
  }

  deleteBook(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${_id}`).pipe(
      catchError((error) => {
        console.error('Error deleting book:', error);
        return throwError(() => new Error('Error deleting book'));
      })
    );
  }
}
