import { AuthService } from './../../../Core/Services/auth/auth.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, ValidationErrors } from '@angular/forms';
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
            // Store the token or user data based on rememberMe
            if (loginData.rememberMe) {
              // Save the token or user info in localStorage
              localStorage.setItem('token', response.data.token);
            } else {
              // Save the token or user info in sessionStorage
              sessionStorage.setItem('token', response.data.token);
            }

            // Navigate based on role
            const role = this.AuthService.getRole();
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']); // Navigate to admin component if role is ADMIN
            } else {
              this.router.navigate(['/home']); // Navigate to home or default page
            }
          } else {
            console.error('Login failed', response);
            this.errorMessage = 'Login failed. Please try again.'; // Display error message to the user
          }
        },
        (error: LoginError) => {
          console.error('Login failed', error);
          this.errorMessage =
            'An error occurred during login. Please try again.'; // Display error message to the user
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
