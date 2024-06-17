import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      return parsedPayload.role;
    }
    return "";
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/matches']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.navigateToLogin();
  }
}
