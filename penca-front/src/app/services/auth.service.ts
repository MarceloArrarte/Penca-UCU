import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ConfigService } from './config.service';
import { ApiError, ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(private router: Router, http: HttpClient, config: ConfigService) {
    super(http, config);
  }

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

  login({ email, password }: { email: string, password: string }): Observable<boolean> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => this.http.post<{ token: string } | ApiError>(`${apiUrl}/login`, { email, password })),
      map((response) => {
        if ('token' in response) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }),
      tap((result) => {
        if (result) {
          this.router.navigateByUrl('/matches')
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.navigateToLogin();
  }
}
