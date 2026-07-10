import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
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
    // If already logged in as admin, redirect to admin dashboard immediately
    if (this.authService.getRole() === 'admin') {
      this.router.navigate(['/admin/dashboard']);
      return;
    }
    this.initForm();
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

      // Validate Admin Credentials exactly as requested
      if (username === 'admin' && password === 'admin123') {
        this.authService.login('admin');
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = 'Invalid Username or Password';
      }
    }, 1000);
  }
}