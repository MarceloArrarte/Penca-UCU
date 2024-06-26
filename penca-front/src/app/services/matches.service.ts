import { Injectable } from '@angular/core';
import { Match, MatchPrediction, MatchResult, MatchTeams, MatchToBeDetermined, PlayedMatch } from '../classes/match';
import { Observable, map, mergeMap, of, switchMap, tap, throwError } from 'rxjs';
import { ApiRepresentation } from '../utils/types';
import { isPast } from 'date-fns';
import { ApiError, ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesService extends ApiService {

  constructor(http: HttpClient, config: ConfigService, private toastService: ToastService) {
    super(http, config);
  }

  getUpcomingMatches(): Observable<Match[]> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<MatchModel[] | ApiError>(`${apiUrl}/matchesAndUsersPredictions?played=false`).pipe(
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
      map<MatchModel[], Match[]>((data) => data.map<Match>((match) => {
        const equipos = match.teams.map((team) => ({ id: team.idTeam, name: team.country})) as MatchTeams;
        const predicciones = match.teams.map((team) => team.goalsPredict) as MatchPrediction;

        return new Match({
          id: match.id,
          datetime: new Date(match.date),
          fase: match.phase,
          equipos,
          prediccion: predicciones.some((p) => p) ? predicciones : undefined
        })
      }))
    );
  }

  getPendingMatches(): Observable<Match[]> {
    return this.getAllMatches().pipe(
      map((matches) => matches.filter((match) => !(match instanceof PlayedMatch)))
    );
  }

  getSingleMatch(id: number): Observable<Match> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<MatchModel | ApiError>(`${apiUrl}/matches/${id}`).pipe(
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
      map<MatchModel, Match>((match) => {
        const equipos = match.teams.map((team) => ({ id: team.idTeam, name: team.country})) as MatchTeams;
        const predicciones = match.teams.map((team) => team.goalsPredict) as MatchPrediction;
        const resultado = match.teams.map((team) => team.goals) as MatchResult;

        if (resultado.some((x) => x)) {
          return new PlayedMatch({
            id: match.id,
            datetime: new Date(match.date),
            fase: match.phase,
            equipos,
            prediccion: predicciones.some((p) => p) ? predicciones : undefined,
            resultado
          });
        }
        else {
          return new Match({
            id: match.id,
            datetime: new Date(match.date),
            fase: match.phase,
            equipos,
            prediccion: predicciones.some((p) => p) ? predicciones : undefined
          });
        }
      }));
  }

  private getAllMatches() {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<MatchModel[] | ApiError>(`${apiUrl}/matches`).pipe(
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
      map<MatchModel[], Match[]>((data) => {
        return data.map((match) => {
          const equipos = match.teams.map((team) => ({ id: team.idTeam, name: team.country})) as MatchTeams;
          const predicciones = match.teams.map((team) => team.goalsPredict) as MatchPrediction;
          const resultado = match.teams.map((team) => team.goals) as MatchResult;

          if (resultado.some((x) => x)) {
            return new PlayedMatch({
              id: match.id,
              datetime: new Date(match.date),
              fase: match.phase,
              equipos,
              prediccion: predicciones.some((p) => p) ? predicciones : undefined,
              resultado
            });
          }
          else {
            return new Match({
              id: match.id,
              datetime: new Date(match.date),
              fase: match.phase,
              equipos,
              prediccion: predicciones.some((p) => p) ? predicciones : undefined
            });
          }
        })
      }));
  }


  getMatchesToBeDetermined(): Observable<MatchToBeDetermined[]> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<MatchToBeDetermined[] | ApiError>(`${apiUrl}/matches/toBeDetermined`).pipe(
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


  getPlayedMatches(): Observable<PlayedMatch[]> {

    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.get<MatchModel[] | ApiError>(`${apiUrl}/matchesAndUsersPredictions?played=true`).pipe(
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
      map<MatchModel[], PlayedMatch[]>((data) => data.map<PlayedMatch>((match) => {
        const equipos = match.teams.map((team) => ({ id: team.idTeam, name: team.country})) as MatchTeams;
        const predicciones = match.teams.map((team) => team.goalsPredict) as MatchPrediction;
        const resultado = match.teams.map((team) => team.goals) as MatchResult

        return new PlayedMatch({
          id: match.id,
          datetime: new Date(match.date),
          fase: match.phase,
          equipos,
          prediccion: predicciones.some((p) => p) ? predicciones : undefined,
          resultado
        })
      }))
    );
  }

  sendPrediction(matchId: number, data: MatchPredictionsModel): Observable<boolean> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.put<{ message: string } | ApiError>(`${apiUrl}/predictMatchResults/${matchId}`, data)
      }),
      map((response) => !('error' in response))
    );
  }

  uploadResult(matchId: number, data: MatchResultModel): Observable<boolean> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.put<{ result: MatchResultModel } | ApiError>(`${apiUrl}/matches/${matchId}/result`, data)
      }),
      map((response) => !('error' in response))
    );
  }

  sendTeamDefinition(matchId: number, data: TeamDefinitionModel): Observable<boolean> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        return this.http.put<{ matchId: number, teamIds: [number, number] } | ApiError>(`${apiUrl}/matchTeams/${matchId}`, data)
      }),
      map((response) => !('error' in response))
    );
  }
}


interface MatchModel {
  id: number;
  date: string;
  phase: string;
  teams: [MatchTeamModel, MatchTeamModel]
}

interface MatchTeamModel {
  idTeam: number;
  country: string;
  goalsPredict: number | null;
  goals: number | null;
}


interface MatchPredictionsModel {
  predictions: [
    { teamId: number, goalsPredict: number },
    { teamId: number, goalsPredict: number }
  ]
}


interface MatchResultModel {
  result: [
    { teamId: number, goals: number },
    { teamId: number, goals: number }
  ]
}


interface TeamDefinitionModel {
  teamIds: [number, number]
}




const _upcomingMatches: ApiRepresentation<typeof Match>[] = [
  {
    id: 1,
    equipos: [{ id: 1, name: 'Argentina'}, {id: 8, name: 'Jamaica'}],
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(30, 30, 0)),
    // prediccion: [2, 0] as [number, number]
  },
  {
    id: 2,
    equipos: [{ id: 10, name: 'Uruguay'}, {id: 6, name: 'Ecuador'}],
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(0, 0, 0))
  }
];

const _playedMatches: ApiRepresentation<typeof PlayedMatch>[] = [
  // Sin predicción
  {
    id: 3,
    equipos: [{ id: 10, name: 'Uruguay'}, { id: 1, name: 'Argentina'}],
    fase: 'Fase de grupos',
    resultado: [4, 2] as [number, number],
    datetime: new Date(new Date().setHours(20, 30, 0))
  },
  // Predicción exacta
  {
    id: 4,
    equipos: [{ id: 9, name: 'Estados Unidos'}, { id: 8, name: 'Jamaica'}],
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(18, 0, 0)),
    resultado: [2, 0] as [number, number],
    prediccion: [2, 0] as [number, number]
  },
  // Predicción correcta
  {
    id: 5,
    equipos: [{id: 12, name: 'Bolivia'}, {id: 3, name: 'Chile'}],
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(20, 30, 0)),
    resultado: [4, 2] as [number, number],
    prediccion: [1, 0] as [number, number]
  },
  // Predicción errada
  {
    id: 6,
    equipos: [{id: 2, name: 'Perú'}, {id: 6, name: 'Ecuador'}],
    fase: 'Fase de grupos',
    datetime: new Date(new Date().setHours(20, 30, 0)),
    resultado: [4, 2] as [number, number],
    prediccion: [0, 3] as [number, number]
  }
];