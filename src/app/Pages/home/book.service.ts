import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
  image:string;
  title: string;
  author: string;
  avgRate: number;
  rating: number;
  shelf: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
}
