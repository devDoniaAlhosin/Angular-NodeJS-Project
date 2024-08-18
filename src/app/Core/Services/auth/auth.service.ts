import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map, catchError, of } from 'rxjs';
import { LoginResponse } from './login-data.model';
import { decodeJWT } from '../utils/jwt-utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  private usernameSubject = new BehaviorSubject<string | null>(
    this.getUsername()
  );
  public username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          console.log(response);
          if (response.status === 'success' && response.data?.token) {
            this.storeToken(response.data.token);
            this.usernameSubject.next(this.getUsername());
          }
        })
      );
  }
  checkUserExistence(userId: string): Observable<boolean> {
    return this.http
      .get<{ exists: boolean }>(`${this.baseUrl}/${userId}/exists`)
      .pipe(
        map((response) => response.exists),
        catchError((error) => {
          console.error('Error checking user existence', error);
          return of(false);
        })
      );
  }

  setBookRateAndStatus(
    userId: string,
    bookId: string,
    rating: number,
    status: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${userId}/books/${bookId}`;
    const body = { rating, status };

    console.log('Sending request with body:', body);

    return this.http.post(url, body);
  }

  storeUserData(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    console.log(userData);
    return userData ? JSON.parse(userData) : null;
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUsername(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = decodeJWT(token);
        return decoded.username || '';
      } catch (error) {
        console.error('Failed to decode token:', error);
        return '';
      }
    }
    return '';
  }

  getUserId(): any {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = decodeJWT(token);
        return decoded.id || null; // Adjust key based on your JWT payload
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }
    return null;
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = decodeJWT(token);
        return decoded?.role || '';
      } catch (error) {
        console.error('Failed to decode token:', error);
        return '';
      }
    }
    return '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.usernameSubject.next(null); // Clear the username
  }

  private testLocalStorage(): void {
    localStorage.setItem('testKey', 'testValue');
    const testValue = localStorage.getItem('testKey');
    console.log('Test value:', testValue); // Should log 'testValue'
  }
}
