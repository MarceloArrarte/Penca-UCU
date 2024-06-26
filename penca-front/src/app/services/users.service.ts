import { Injectable } from '@angular/core';
import { ApiError, ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { IEquipo } from '../classes/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  constructor(http: HttpClient, config: ConfigService) {
    super(http, config);
  }

  getRanking(): Observable<UserScore[]> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<UserScore[] | ApiError>(`${apiUrl}/usersRanking`).pipe(
          switchMap((response) => {
            if ('error' in response) {
              return throwError(() => response.error);
            }
            else {
              return of(response);
            }
          })
        );
      })
    )
  }

  getCareers(): Observable<string[]> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<string[] | ApiError>(`${apiUrl}/careers`).pipe(
          switchMap((response) => {
            if ('error' in response) {
              return throwError(() => response.error);
            }
            else {
              return of(response);
            }
          })
        );
      })
    );
  }

  getProfile(): Observable<UserProfile> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<UserProfile | ApiError>(`${apiUrl}/profile`).pipe(
          switchMap((response) => {
            if ('error' in response) {
              return throwError(() => response.error);
            }
            else {
              return of(response);
            }
          })
        );
      })
    );
  }
}

export interface UserScore {
  userDocument: string;
  name: string;
  score: number;
} 

export interface UserProfile {
  name: string;
  email: string;
  score: number;
  campeon: IEquipo;
  subcampeon: IEquipo;
  carreras: string[];
}