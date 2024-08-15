import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorsServiceService {
  private apiUrl = 'http://localhost:3000/api/books'; // Adjust according to your backend URL

  constructor(private http: HttpClient) { }
   // Method to get all authors
   getAuthors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Method to get a single author by ID
  getAuthorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Method to update an author
  updateAuthor(id: string, authorData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, authorData);
  }

  // Method to delete an author
  deleteAuthor(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


