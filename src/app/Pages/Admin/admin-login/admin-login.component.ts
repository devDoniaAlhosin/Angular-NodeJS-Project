import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import Admin from '../../../Shared/models/adminInterface';
import { AdminServiceService } from '../../../core/services/admin-service.service';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
loginObject: any={
username:'',
password:''
}
constructor(private router: Router){}
onlogin(){
  if(this.loginObject.username =="admin" && this.loginObject.password =="123")
    this.router.navigateByUrl('/layout')
}
// admins!:Admin[];
// adminService=inject(AdminServiceService)
// ngOnInit(){
//   this.adminService.getAdmin().subscribe ((result:any)=>{
// this.admins=result;
// console.log(this.admins)
//   })
// }
 }
