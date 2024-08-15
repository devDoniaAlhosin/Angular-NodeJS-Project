// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {
//   private apiUrl = 'http://localhost:3000/api/books'; // Adjust according to your backend URL

//   constructor(private http: HttpClient) { }

//   getBooks(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   updateBook(bookId: string, bookData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${bookId}`, bookData);
//   }

//   deleteBook(bookId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${bookId}`);
//   }
// }


// ====

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from '../../Shared/models/booksInterface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books'; // Adjust according to your backend URL

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(this.apiUrl);

  }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/genres');
  }

  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/authors');
  }

  updateBook(bookId: string, bookData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${bookId}`, bookData);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookId}`);
  }
}
