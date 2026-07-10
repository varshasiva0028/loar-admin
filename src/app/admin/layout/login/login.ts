import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$|^[a-zA-Z0-9_]{4,20}$') // Support email or standard username patterns
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

      // Mock validation credentials logic
      if ((username === 'admin@loanportal.com' || username === 'admin') && password === 'admin123') {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    }, 1200);
  }
}