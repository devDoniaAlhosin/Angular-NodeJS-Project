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
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ValidateService: ValidateService
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.registerForm.patchValue({ profileImage: file });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('username', this.registerForm.get('username')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      if (this.registerForm.get('profileImage')?.value) {
        formData.append(
          'profileImage',
          this.registerForm.get('profileImage')?.value
        );
      }
      // Handle the form submission
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
    }
  }
}
