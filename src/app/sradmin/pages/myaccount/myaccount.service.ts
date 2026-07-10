import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SrProfileModel {
  id: string;
  username: string;
  email: string;
  password?: string;
  plan: 'Basic' | 'Professional' | 'Premium' | 'Enterprise';
  profileImage: string;
}

export interface SrNotificationSettings {
  email: boolean;
  push: boolean;
  system: boolean;
  security: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  private profile: SrProfileModel = {
    id: 'SRADM10001',
    username: 'Super Administrator',
    email: 'superadmin@loanportal.com',
    password: 'supersecretpassword',
    plan: 'Enterprise',
    profileImage:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="128" height="128"><circle cx="12" cy="12" r="11" fill="%23198754" opacity="0.1"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%23198754"/></svg>'
  };

  private settings: SrNotificationSettings = {
    email: true,
    push: false,
    system: true,
    security: true
  };

  constructor() {}

  public getProfile(): Observable<SrProfileModel> {
    return of({ ...this.profile });
  }

  public updateProfile(updatedProfile: SrProfileModel): Observable<SrProfileModel> {
    this.profile = { ...updatedProfile };
    return of({ ...this.profile });
  }

  public getNotificationSettings(): Observable<SrNotificationSettings> {
    return of({ ...this.settings });
  }

  public updateNotificationSettings(updatedSettings: SrNotificationSettings): Observable<SrNotificationSettings> {
    this.settings = { ...updatedSettings };
    return of({ ...this.settings });
  }
}
