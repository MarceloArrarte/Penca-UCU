import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ConfigService } from './config.service';
import { ApiError, ApiService } from './api.service';
import { AuthHelperService } from './auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(http: HttpClient, config: ConfigService, private authHelper: AuthHelperService) {
    super(http, config);
  }

  login({ email, password }: { email: string, password: string }): Observable<boolean> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.post<{ token: string } | ApiError>(`${apiUrl}/login`, { email, password })
      }),
      map((response) => {
        if ('token' in response) {
          this.authHelper.setToken(response.token);
          return true;
        }
        return false;
      }),
      tap((result) => {
        if (result) {
          this.authHelper.navigateToHome();
        }
      })
    );
  }

  logout(): void {
    this.authHelper.clearToken();
    this.authHelper.navigateToLogin();
  }

  signUp(data: SignUpModel): Observable<boolean> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.post<{ message: string } | ApiError>(`${apiUrl}/register`, data)
      }),
      map((response) => !('error' in response)),
      tap((result) => {
        if (result) {
          this.authHelper.navigateToLogin();
        }
      })
    );
  }
}


interface SignUpModel {
  document: string;
  name: string;
  email: string;
  password: string;
  championId: number;
  runnerUpId: number;
  careers: string[];
}