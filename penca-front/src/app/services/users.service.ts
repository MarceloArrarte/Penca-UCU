import { Injectable } from '@angular/core';
import { ApiError, ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, of, switchMap, throwError } from 'rxjs';

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
}

export interface UserScore {
  userDocument: string;
  name: string;
  score: number;
} 