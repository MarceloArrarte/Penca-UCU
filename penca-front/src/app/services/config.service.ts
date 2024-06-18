import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, of, single, tap } from 'rxjs';


export interface AppConfig {
  apiUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _appConfig$ = new ReplaySubject<AppConfig>(1);
  public appConfig$ = this._appConfig$.asObservable();

  private defaults: AppConfig = {
    apiUrl: 'localhost:8000/api'
  };

  constructor(http: HttpClient) {
    http.get<AppConfig>('assets/app.config.json', { observe: 'body'}).pipe(
      tap(() => console.log('Configuración de entorno cargada.')),
      catchError((err) => {
        console.error('Error al obtener configuración de entorno. Usando valores por defecto.');
        return of(this.defaults);
      })
    ).subscribe((config) => {
      this._appConfig$.next(config);
      this._appConfig$.complete();
    });
  }
}
