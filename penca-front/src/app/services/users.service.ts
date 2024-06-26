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
        return this.http.get<UserProfileModel | ApiError>(`${apiUrl}/profile`).pipe(
          switchMap((response) => {
            if ('error' in response) {
              return throwError(() => response.error);
            }
            else {
              return of({
                name: response.nombre,
                email: response.email,
                score: response.score,
                campeon: response.campeon
                  ? { name: response.campeon, picture: `assets/equipos/${response.campeon.replaceAll(' ', '_')}.png` } as IEquipo
                  : null,
                subcampeon: response.subcampeon
                  ? { name: response.subcampeon, picture: `assets/equipos/${response.subcampeon.replaceAll(' ', '_')}.png` } as IEquipo
                  : null,
                careers: response.careers
              });
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
  score: number | null;
  campeon: IEquipo | null;
  subcampeon: IEquipo | null;
  careers: string[] | null;
}

export interface UserProfileModel {
  nombre: string;
  email: string;
  score: number | null;
  campeon: string | null;
  subcampeon: string | null;
  careers: string[] | null;
}