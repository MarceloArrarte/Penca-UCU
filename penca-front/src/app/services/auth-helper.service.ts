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
    let role;
    if (!(role = this.getRole())) return;

    switch (role) {
      case 'admin':
        this.router.navigateByUrl('/admin');
        break;
      case 'alumno':
        this.router.navigateByUrl('/matches');
        break;
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

  getRole(): 'alumno' | 'admin' | null {
    const token = this.getToken();
    if (token) {
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      return parsedPayload.role;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
