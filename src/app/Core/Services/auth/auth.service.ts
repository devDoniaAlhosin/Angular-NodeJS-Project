import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from './login-data.model';
import { decodeJWT } from '../utils/jwt-utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';
  private loginUrl = 'http://localhost:3000/api/users/login';
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
            this.usernameSubject.next(this.getUsername()); // Update the username
          }
        })
      );
  }
  storeUserData(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }
  getUserData(): any {
    const userData = localStorage.getItem('userData');
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
