import { Injectable } from '@angular/core';
import { ApiError, ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, filter, map, of, switchMap, throwError } from 'rxjs';
import { IEquipo } from '../classes/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends ApiService {

  constructor(http: HttpClient, config: ConfigService) {
    super(http, config);
  }

  getAll(): Observable<IEquipo[]> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<{ id: number, pais: string }[] | ApiError>(`${apiUrl}/teams`).pipe(
          switchMap((response) => {
            if ('error' in response) {
              return throwError(() => response.error);
            }
            else {
              return of(response);
            }
          })
        );
      }),
      map((data) => data.map((team) => ({
        id: team.id,
        name: team.pais,
        picture: `assets/equipos/${team.pais.replaceAll(' ', '_')}.png`
      })))
    );
  }
}
