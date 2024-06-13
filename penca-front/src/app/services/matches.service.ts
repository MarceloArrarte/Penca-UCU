import { Injectable } from '@angular/core';
import { Match, MatchPrediction, PlayedMatch } from '../classes/match';
import { Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { ApiRepresentation } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor() { }

  getUpcomingMatches(): Observable<Match[]> {
    return of(_upcomingMatches).pipe(
      map((res) => res.map((obj) => new Match(obj)))
    );
  }

  getPlayedMatches(): Observable<PlayedMatch[]> {
    return of(_playedMatches).pipe(
      map((res) => res.map((obj) => new PlayedMatch(obj)))
    );
  }

  getMatch(id: number): Observable<Match> {
    return of(_upcomingMatches.find((match) => match.id == id)).pipe(
      switchMap((res) => {
        if (res) {
          return of(res);
        }
        else {
          return throwError(() => `Partido con ID ${id} no encontrado`);
        }
      }),
      map((res) => new Match(res))
    );
  }

  sendPrediction(matchId: number, prediction: MatchPrediction): Observable<boolean> {
    const match = _upcomingMatches.find((match) => match.id == matchId);

    if (!match) {
      return of(false);
    }

    match.prediccion = prediction;
    return of(true);
  }
}



const _upcomingMatches: readonly ApiRepresentation<typeof Match>[] = [
  {
    id: 1,
    equipos: ['Estados Unidos', 'Jamaica'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(1, 30, 0)),
    // prediccion: [2, 0] as [number, number]
  },
  {
    id: 2,
    equipos: ['Uruguay', 'Argentina'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(20, 30, 0))
  }
];

const _playedMatches: readonly ApiRepresentation<typeof PlayedMatch>[] = [
  // Sin predicción
  {
    id: 3,
    equipos: ['Uruguay', 'Argentina'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    resultado: [4, 2] as [number, number],
    datetime: new Date(new Date().setHours(20, 30, 0))
  },
  // Predicción exacta
  {
    id: 4,
    equipos: ['Estados Unidos', 'Jamaica'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(18, 0, 0)),
    resultado: [2, 0] as [number, number],
    prediccion: [2, 0] as [number, number]
  },
  // Predicción correcta
  {
    id: 5,
    equipos: ['Bolivia', 'Chile'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(20, 30, 0)),
    resultado: [4, 2] as [number, number],
    prediccion: [1, 0] as [number, number]
  },
  // Predicción errada
  {
    id: 6,
    equipos: ['Perú', 'Ecuador'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(20, 30, 0)),
    resultado: [4, 2] as [number, number],
    prediccion: [0, 3] as [number, number]
  }
];