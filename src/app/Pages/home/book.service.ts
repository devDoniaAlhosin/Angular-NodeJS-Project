import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
  image: string;
  title: string;
  author: string;
  avgRate: number;
  rating: number;
  shelf: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  fetchUserBooks(userId: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://node-js-server-side.vercel.app/api/books';

  constructor(private http: HttpClient) {}

  fetchBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }
}
