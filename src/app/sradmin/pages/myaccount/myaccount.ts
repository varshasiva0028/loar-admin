import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountService, SrProfileModel, SrNotificationSettings } from './myaccount.service';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myaccount.html',
  styleUrl: './myaccount.css',
})
export class Myaccount implements OnInit {
  public profile: SrProfileModel | null = null;
  public settings: SrNotificationSettings | null = null;
  public isEditing = false;

  // Edit fields
  public tempUsername = '';
  public tempEmail = '';
  public tempPassword = '';
  public tempConfirmPassword = '';

  // Validation
  public errors: Record<string, string> = {};
  public isSubmitted = false;

  constructor(private myAccountService: MyAccountService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadSettings();
  }

  private loadProfile(): void {
    this.myAccountService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.resetTempFields();
      },
      error: (err) => console.error('Error fetching profile:', err)
    });
  }

  private loadSettings(): void {
    this.myAccountService.getNotificationSettings().subscribe({
      next: (data) => {
        this.settings = data;
      },
      error: (err) => console.error('Error fetching settings:', err)
    });
  }

  private resetTempFields(): void {
    if (!this.profile) return;
    this.tempUsername = this.profile.username;
    this.tempEmail = this.profile.email;
    this.tempPassword = this.profile.password || '';
    this.tempConfirmPassword = this.profile.password || '';
    this.errors = {};
    this.isSubmitted = false;
  }

  public getPlanBadgeClass(plan: SrProfileModel['plan']): string {
    switch (plan) {
      case 'Enterprise':
        return 'bg-success text-white';
      case 'Professional':
        return 'bg-primary text-white';
      case 'Premium':
        return 'bg-warning text-dark';
      case 'Basic':
        return 'bg-secondary text-white';
      default:
        return 'bg-dark text-white';
    }
  }

  public startEditing(): void {
    this.isEditing = true;
  }

  public cancelEditing(): void {
    this.isEditing = false;
    this.resetTempFields();
  }

  public validateField(field: string): void {
    if (!this.isSubmitted) return;

    if (field === 'username') {
      if (!this.tempUsername.trim()) {
        this.errors['username'] = 'Username is required.';
      } else {
        delete this.errors['username'];
      }
    }

    if (field === 'email') {
      if (!this.tempEmail.trim()) {
        this.errors['email'] = 'Email ID is required.';
      } else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(this.tempEmail.trim())) {
          this.errors['email'] = 'Please enter a valid email address.';
        } else {
          delete this.errors['email'];
        }
      }
    }

    if (field === 'password') {
      if (!this.tempPassword) {
        this.errors['password'] = 'Password is required.';
      } else if (this.tempPassword.length < 6) {
        this.errors['password'] = 'Password must be at least 6 characters.';
      } else {
        delete this.errors['password'];
      }
    }

    if (field === 'confirmPassword') {
      if (!this.tempConfirmPassword) {
        this.errors['confirmPassword'] = 'Confirm password is required.';
      } else if (this.tempPassword !== this.tempConfirmPassword) {
        this.errors['confirmPassword'] = 'Passwords do not match.';
      } else {
        delete this.errors['confirmPassword'];
      }
    }
  }

  public validateForm(): boolean {
    this.errors = {};

    if (!this.tempUsername.trim()) {
      this.errors['username'] = 'Username is required.';
    }

    if (!this.tempEmail.trim()) {
      this.errors['email'] = 'Email ID is required.';
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.tempEmail.trim())) {
        this.errors['email'] = 'Please enter a valid email address.';
      }
    }

    if (!this.tempPassword) {
      this.errors['password'] = 'Password is required.';
    } else if (this.tempPassword.length < 6) {
      this.errors['password'] = 'Password must be at least 6 characters.';
    }

    if (!this.tempConfirmPassword) {
      this.errors['confirmPassword'] = 'Confirm password is required.';
    } else if (this.tempPassword !== this.tempConfirmPassword) {
      this.errors['confirmPassword'] = 'Passwords do not match.';
    }

    return Object.keys(this.errors).length === 0;
  }

  public saveProfile(): void {
    this.isSubmitted = true;
    if (!this.profile) return;

    if (this.validateForm()) {
      const updatedProfile: SrProfileModel = {
        ...this.profile,
        username: this.tempUsername.trim(),
        email: this.tempEmail.trim(),
        password: this.tempPassword
      };

      this.myAccountService.updateProfile(updatedProfile).subscribe({
        next: (data) => {
          this.profile = data;
          this.isEditing = false;
          this.resetTempFields();
        },
        error: (err) => console.error('Error saving profile:', err)
      });
    }
  }

  public toggleSetting(key: keyof SrNotificationSettings): void {
    if (!this.settings) return;
    const updatedSettings = {
      ...this.settings,
      [key]: !this.settings[key]
    };
    this.myAccountService.updateNotificationSettings(updatedSettings).subscribe({
      next: (data) => {
        this.settings = data;
      },
      error: (err) => console.error('Error toggling setting:', err)
    });
  }
}
