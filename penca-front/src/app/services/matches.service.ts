import { Injectable } from '@angular/core';
import { PendingMatch, PlayedMatch } from '../classes/match';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor() { }

  getUpcomingMatches(): Observable<PendingMatch[]> {
    return of([
      {
        equipos: ['Estados Unidos', 'Jamaica'] as [string, string],
        jornada: 1,
        fase: 'Fase de grupos',
        datetime: new Date(new Date().setHours(18, 0, 0)),
        prediccion: [2, 0] as [number, number]
      },
      {
        equipos: ['Uruguay', 'Argentina'] as [string, string],
        jornada: 1,
        fase: 'Fase de grupos',
        datetime: new Date(new Date().setHours(20, 30, 0))
      }
    ]).pipe(
      map((res) => res.map((obj) => new PendingMatch(obj)))
    );
  }

  getPlayedMatches(): Observable<PlayedMatch[]> {
    return of([
      // Sin predicción
      {
        equipos: ['Uruguay', 'Argentina'] as [string, string],
        jornada: 1,
        fase: 'Fase de grupos',
        resultado: [4, 2] as [number, number],
        datetime: new Date(new Date().setHours(20, 30, 0))
      },
      // Predicción exacta
      {
        equipos: ['Estados Unidos', 'Jamaica'] as [string, string],
        jornada: 1,
        fase: 'Fase de grupos',
        datetime: new Date(new Date().setHours(18, 0, 0)),
        resultado: [2, 0] as [number, number],
        prediccion: [2, 0] as [number, number]
      },
      // Predicción correcta
      {
        equipos: ['Bolivia', 'Chile'] as [string, string],
        jornada: 1,
        fase: 'Fase de grupos',
        datetime: new Date(new Date().setHours(20, 30, 0)),
        resultado: [4, 2] as [number, number],
        prediccion: [1, 0] as [number, number]
      },
      // Predicción errada
      {
        equipos: ['Perú', 'Ecuador'] as [string, string],
        jornada: 1,
        fase: 'Fase de grupos',
        datetime: new Date(new Date().setHours(20, 30, 0)),
        resultado: [4, 2] as [number, number],
        prediccion: [0, 3] as [number, number]
      }
    ]).pipe(
      map((res) => res.map((obj) => new PlayedMatch(obj)))
    );
  }
}
