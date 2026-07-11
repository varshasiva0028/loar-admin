import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MyAccountService,
  SrNotificationSettings
} from '../myaccount/myaccount.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {

  public settings: SrNotificationSettings | null = null;

  constructor(
    private myAccountService: MyAccountService
  ) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  /**
   * Load notification settings
   */
  private loadSettings(): void {
    this.myAccountService.getNotificationSettings().subscribe({
      next: (data: SrNotificationSettings) => {
        this.settings = data;
      },
      error: (err: unknown) => {
        console.error('Error fetching settings:', err);
      }
    });
  }

  /**
   * Toggle individual notification setting
   */
  public toggleSetting(key: keyof SrNotificationSettings): void {
    if (!this.settings) {
      return;
    }

    const updatedSettings: SrNotificationSettings = {
      ...this.settings,
      [key]: !this.settings[key]
    };

    this.myAccountService.updateNotificationSettings(updatedSettings).subscribe({
      next: (data: SrNotificationSettings) => {
        this.settings = data;
      },
      error: (err: unknown) => {
        console.error('Error updating settings:', err);
      }
    });
  }
}