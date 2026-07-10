import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ROLE_KEY = 'role';

  constructor() {}

  public login(role: 'admin' | 'superadmin'): void {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  public logout(): void {
    localStorage.removeItem(this.ROLE_KEY);
  }

  public getRole(): 'admin' | 'superadmin' | null {
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