import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private http: HttpClient
  ) { }

  getAuthors() {
    return this.http.get('http://localhost:3000/api/authors');
    // return this.http.get('authors.json')
  }


}
