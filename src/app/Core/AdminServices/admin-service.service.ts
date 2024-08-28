import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Admin from '../../Shared/models/adminInterface';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  apiUrl = 'https://node-js-server-side.vercel.app';
  httpClient = inject(HttpClient);
  constructor() {}
  getAdmin() {
    this.httpClient.get<Admin[]>(this.apiUrl + '/admin');
  }
}
