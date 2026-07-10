import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountService, MyAccountModel } from './myaccount.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myaccount.html',
  styleUrl: './myaccount.css'
})
export class MyAccount implements OnInit {

  public profile: MyAccountModel | null = null;
  public isEditing = false;

  public tempUsername = '';
  public tempEmail = '';
  public tempNbfcName = '';
  public tempPlan: MyAccountModel['plan'] = 'Basic';

  constructor(
    private myAccountService: MyAccountService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.myAccountService.getProfile().subscribe({
      next: (data: MyAccountModel) => {
        this.profile = data;
        this.resetTempFields();
      },
      error: (err: unknown) => {
        console.error('Error fetching profile:', err);
      }
    });
  }

  private resetTempFields(): void {
    if (!this.profile) {
      return;
    }
    this.tempUsername = this.profile.username;
    this.tempEmail = this.profile.email;
    this.tempNbfcName = this.profile.nbfcName;
    this.tempPlan = this.profile.plan;
  }

  public getPlanBadgeClass(plan: MyAccountModel['plan']): string {
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

  public saveProfile(
    usernameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    nbfcInput: HTMLInputElement,
    planSelect: HTMLSelectElement
  ): void {
    if (!this.profile) {
      return;
    }

    const updatedProfile: MyAccountModel = {
      ...this.profile,
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      nbfcName: nbfcInput.value.trim(),
      plan: planSelect.value as MyAccountModel['plan']
    };

    this.myAccountService.updateProfile(updatedProfile).subscribe({
      next: (data: MyAccountModel) => {
        this.profile = data;
        this.isEditing = false;
        this.resetTempFields();
      },
      error: (err: unknown) => {
        console.error('Error updating profile:', err);
      }
    });
  }
}