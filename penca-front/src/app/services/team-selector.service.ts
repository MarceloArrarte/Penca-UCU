import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, concat, first, map, merge, share, take, withLatestFrom } from 'rxjs';
import { IEquipo } from '../classes/equipo.model';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamSelectorService {

  private firstSelected$ = new BehaviorSubject<IEquipo | null>(null);
  private secondSelected$ = new BehaviorSubject<IEquipo | null>(null);

  // firstSelected$ = this.selectedCampeonSubject.asObservable();
  // secondSelected$ = this.selectedSubCampeonSubject.asObservable();

  teams$: Observable<IEquipo[]>;
  unselectedTeams$: Observable<IEquipo[]>;

  constructor(teamsService: TeamsService) {
    this.teams$ = teamsService.getAll();

    this.unselectedTeams$ = concat(
      this.teams$.pipe(first(), share()),
      combineLatest([this.firstSelected$, this.secondSelected$]).pipe(
        map((teams) => teams.filter((t): t is IEquipo => !!t).map((t) => t.id)),
        withLatestFrom(this.teams$),
        map(([selected, all]) => {
          return all.filter((team) => !selected.includes(team.id))
        })
      )
    );
  }

  getTeams() {
    return this.teams$;
  }

  selectFirst(equipo: IEquipo) {
    this.firstSelected$.next(equipo);
  }

  selectSecond(equipo: IEquipo) {
    this.secondSelected$.next(equipo);
  }
}