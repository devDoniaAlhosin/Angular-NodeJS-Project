import { AuthService } from './../../../Core/Services/auth/auth.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import {
  LoginData,
  LoginResponse,
  LoginError,
} from '../../../Core/Services/auth/login-data.model'; // Adjust path as needed
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string | null = null; // To store error messages
  constructor(private router: Router, private AuthService: AuthService) {}

  SendLoginData(loginForm: NgForm) {
    if (loginForm.valid) {
      const loginData = {
        username: loginForm.value.username,
        password: loginForm.value.password,
        rememberMe: loginForm.value.rememberMe,
      };

      this.AuthService.login(loginData.username, loginData.password).subscribe(
        (response: LoginResponse) => {
          if (response.status === 'success') {
            const role = this.AuthService.getRole();
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']); // Navigate to admin component if role is ADMIN
            } else {
              this.router.navigate(['/home']); // Navigate to home or default page
            }
          } else {
            console.error('Login failed', response);
          }
        },
        (error: LoginError) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
