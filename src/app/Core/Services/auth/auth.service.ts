// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './login-data.model';
import { decodeJWT } from '../utils/jwt-utils'; // Import the utility function

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';
  private loginUrl = 'http://localhost:3000/api/users/login'; // Node.js server URL

  constructor(private http: HttpClient) {}

  // Register user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // Login user
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.loginUrl, { username, password })
      .pipe(
        tap((response) => {
          if (response.status === 'success' && response.data?.token) {
            this.storeToken(response.data.token); // Store the token if the response is successful
          }
        })
      );
  }

  // Store token in localStorage
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve token
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
  // Get the role from the token
  getRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = decodeJWT(token); // Decode token to extract payload
        console.log('Decoded Token:', decoded);
        return decoded?.role || '';
      } catch (error) {
        console.error('Failed to decode token:', error);
        return '';
      }
    }
    return '';
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Log out user
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
