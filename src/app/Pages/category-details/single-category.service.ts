import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:4000/api/genres/';

  constructor(private http: HttpClient) {}

  getPopularBooks(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${categoryId}`);
  }
}
