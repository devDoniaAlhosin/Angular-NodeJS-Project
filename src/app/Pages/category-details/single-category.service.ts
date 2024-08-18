import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
  name:string;
  description:string
  author: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/genres'; 

  constructor(private http: HttpClient) {}

  getPopularBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
}
