import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../../Shared/Models/models';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private baseUrl = 'https://node-js-server-side.vercel.app/api/genres';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
