import { AuthService } from './../../../Core/Services/auth/auth.service';
import { ValidateService } from './../../../Core/Services/validate/validate.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Fixed styleUrl to styleUrls
  providers: [AuthService],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  selectedFile: File | null = null; // Initialize selectedFile

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ValidateService: ValidateService,
    private AuthService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
        password: [
          '',
          [Validators.required, ValidateService.strongPasswordValidator()],
        ],
        confirmPassword: ['', [Validators.required]],
        profileImage: [null],
      },
      {
        validator: ValidateService.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('username', this.registerForm.get('username')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile, this.selectedFile.name);
      }

      this.AuthService.register(formData).subscribe(
        (response) => {
          console.log(response);
          if (response.status === 'success' && response.data.user?.token) {
            this.AuthService.storeToken(response.data.user.token);
            this.AuthService.storeUserData(response.data.user);
            this.router.navigate(['/home']); // Redirect to home
          }
        },
        (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Username or email already exists!';
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        }
      );
    }
  }
}
