import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private baseUrl = 'http://localhost:3000/api/authors';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
