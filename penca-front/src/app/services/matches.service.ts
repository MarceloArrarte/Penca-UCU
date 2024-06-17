import { Injectable } from '@angular/core';
import { Match, MatchPrediction, MatchResult, PlayedMatch } from '../classes/match';
import { Observable, map, of, switchMap, tap, throwError } from 'rxjs';
import { ApiRepresentation } from '../utils/types';
import { isPast } from 'date-fns';

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

  getPendingMatches(): Observable<Match[]> {
    return of(_upcomingMatches.filter((m) => isPast(m.datetime))).pipe(
      map((res) => res.map((obj) => new Match(obj)))
    );
  }

  getPlayedMatches(): Observable<PlayedMatch[]> {
    return of(_playedMatches).pipe(
      map((res) => res.map((obj) => new PlayedMatch(obj)))
    );
  }

  getMatch(id: number): Observable<Match> {
    return of([..._playedMatches, ..._upcomingMatches].find((match) => match.id == id)).pipe(
      switchMap((res) => {
        if (res) {
          return of(res);
        }
        else {
          return throwError(() => `Partido con ID ${id} no encontrado`);
        }
      }),
      map((res) => (<PlayedMatch>res).resultado ? new PlayedMatch(<PlayedMatch>res) : new Match(res))
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

  uploadResult(matchId: number, result: MatchResult): Observable<boolean> {
    let matchIndex = _playedMatches.findIndex((match) => match.id == matchId);

    if (matchIndex >= 0) {
      _playedMatches[matchIndex].resultado = result;
      return of(true);
    }

    matchIndex = _upcomingMatches.findIndex((match) => match.id == matchId);
    if (matchIndex >= 0) {
      const updated = new PlayedMatch({ ..._upcomingMatches[matchIndex], resultado: result });
      _upcomingMatches.splice(matchIndex, 1);
      _playedMatches.push(updated);
      return of(true);
    }

    return of(false);
  }
}



const _upcomingMatches: ApiRepresentation<typeof Match>[] = [
  {
    id: 1,
    equipos: ['Estados Unidos', 'Jamaica'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(30, 30, 0)),
    // prediccion: [2, 0] as [number, number]
  },
  {
    id: 2,
    equipos: ['Uruguay', 'Ecuador'] as [string, string],
    jornada: 1,
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(0, 0, 0))
  }
];

const _playedMatches: ApiRepresentation<typeof PlayedMatch>[] = [
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