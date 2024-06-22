import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  constructor(private router: Router) { }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  navigateToHome(): void {
    let role = this.getRole();

    switch (role) {
      case 'admin':
        this.router.navigateByUrl('/admin');
        break;
      case 'alumno':
        this.router.navigateByUrl('/matches');
        break;
      case null:
        this.navigateToLogin();
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  clearToken(): void {
    localStorage.removeItem('token');
  }

  private decodeToken(): TokenData | null {
    const token = this.getToken();

    if (token) {
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload) as TokenData;
      return parsedPayload;
    }
    else {
      return null;
    }
  }

  getRole(): 'alumno' | 'admin' | null {
    return this.decodeToken()?.role ?? null;
  }

  getDocument(): string | null {
    return this.decodeToken()?.document ?? null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}


interface TokenData {
  document: string;
  email: string;
  role: UserRole;
}

type UserRole = 'admin' | 'alumno';