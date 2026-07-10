import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ROLE_KEY = 'role';

  constructor() {}

  public login(role: 'admin' | 'superadmin'): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.ROLE_KEY, role);
    }
  }

  public logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.ROLE_KEY);
    }
  }

  public getRole(): 'admin' | 'superadmin' | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    const role = localStorage.getItem(this.ROLE_KEY);
    if (role === 'admin' || role === 'superadmin') {
      return role;
    }
    return null;
  }

  public isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
}