import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MyAccountModel {
  id: string;
  username: string;
  email: string;
  nbfcName: string;
  plan: 'Basic' | 'Professional' | 'Premium' | 'Enterprise';
  profileImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  private profile: MyAccountModel = {
    id: 'ADM10001',
    username: 'Admin User',
    email: 'admin@loanportal.com',
    nbfcName: 'Bajaj Finance',
    plan: 'Enterprise',
    profileImage:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="128" height="128"><circle cx="12" cy="12" r="11" fill="%23198754" opacity="0.1"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%23198754"/></svg>'
  };
  constructor() {}
  public getProfile(): Observable<MyAccountModel> {
    return of({ ...this.profile });
  }

  public updateProfile(updatedProfile: MyAccountModel): Observable<MyAccountModel> {
    this.profile = { ...updatedProfile };
    return of({ ...this.profile });
  }
}