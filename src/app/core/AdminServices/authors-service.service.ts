import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../../Shared/models/authorsInterface';
@Injectable({
  providedIn: 'root'
})
export class AuthorsServiceService {
  private apiUrl = 'http://localhost:3000/api/authors';

  constructor(private http: HttpClient) { }
  
   // Method to get all authors
   getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  addAuthor(author: Omit<Author, '_id'>): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author).pipe(
      catchError(error => {
        console.error('Error adding author:', error);
        return throwError(() => new Error('Error adding author'));
      })
    );
  }
  // Method to get a single author by ID
  getAuthorById(_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${_id}`);
  }

  // Method to update an author
  updateAuthor(_id: string, authorData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${_id}`, authorData);
  }

  // Method to delete an author
  deleteAuthor(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${_id}`);
  }
}



