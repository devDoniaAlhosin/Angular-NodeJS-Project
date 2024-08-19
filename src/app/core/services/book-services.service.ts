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

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Books } from '../../Shared/models/booksInterface';
// import { Observable, throwError } from 'rxjs';  // Import throwError
// import { catchError } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {
//   private apiUrl = 'http://localhost:3000/api/books'; // Adjust according to your backend URL

//   constructor(private http: HttpClient) { }

//   // getBooks(): Observable<Books[]> {
//   //   return this.http.get<Books[]>(this.apiUrl);

//   // }
//   getBooks(): Observable<Books[]> {
//     return this.http.get<Books[]>(this.apiUrl).pipe(
//       catchError(error => {
//         console.error('Error fetching books:', error);
//         return throwError(() => new Error('Error fetching books'));
//       })
//     );
//   }

//   getGenres(): Observable<any[]> {
//     return this.http.get<any[]>('http://localhost:3000/api/genres');
//   }

//   getAuthors(): Observable<any[]> {
//     return this.http.get<any[]>('http://localhost:3000/api/authors');
//   }

//   updateBook(bookId: string, bookData: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/${bookId}`, bookData);
//   }

//   deleteBook(bookId: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${bookId}`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Books } from '../../Shared/models/booksInterface';
import { Observable, throwError } from 'rxjs';  // Import throwError
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books'; // Adjust according to your backend URL

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching books:', error);
        return throwError(() => new Error('Error fetching books'));
      })
    );
  }

  updateBook (_id: string,book: Books): Observable<Books> {
    return this.http.patch<any>(`${this.apiUrl}/books/${_id}`, book).pipe(
      catchError((error) => {
        console.error('Error updating book:', error);
        return throwError('Error updating book');
      })
    );
  }

  addBook(book: Books): Observable<Books> {
    return this.http.post<Books>(this.apiUrl,book).pipe(
      catchError((error) => {
        console.error('Error adding book:', error);
        return throwError('Error adding book');
      })
    );
  }
  getGenres(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/genres');
  }

  getAuthors(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/authors');
  }

  deleteBook(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${_id}`).pipe(
      catchError(error => {
        console.error('Error deleting book:', error);
        return throwError(() => new Error('Error deleting book'));
      })
    );
  }
}
