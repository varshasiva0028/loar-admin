import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sradmin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class SrLogin implements OnInit {
  public loginForm!: FormGroup;
  public showPassword = false;
  public isSubmitting = false;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    // If already logged in as superadmin, redirect to superadmin dashboard immediately
    if (this.authService.getRole() === 'superadmin') {
      this.router.navigate(['/sradmin/dashboard']);
      return;
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      rememberMe: [false]
    });
  }

  // Easy getters for form controls to check errors in HTML template
  get f() {
    return this.loginForm.controls;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    // Simulate login API call response delay
    setTimeout(() => {
      this.isSubmitting = false;
      const { username, password } = this.loginForm.value;

      // Validate Super Admin Credentials exactly as requested
      if (username === 'superadmin' && password === 'super123') {
        this.authService.login('superadmin');
        this.router.navigate(['/sradmin/dashboard']);
      } else {
        this.errorMessage = 'Invalid Username or Password';
      }
    }, 1000);
  }
}