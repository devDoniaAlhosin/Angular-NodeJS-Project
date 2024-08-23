import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Admin from '../../Shared/models/adminInterface';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  apiUrl="http://localhost:3000"
  httpClient=inject(HttpClient)
  constructor(){}
getAdmin(){
  this.httpClient.get<Admin[]>(this.apiUrl+'/admin');
}
}
