import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, concat, first, map, merge, take, withLatestFrom } from 'rxjs';
import { IEquipo } from '../classes/equipo.model';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamSelectorService {

  private selectedCampeonSubject = new BehaviorSubject<IEquipo | null>(null);
  private selectedSubCampeonSubject = new BehaviorSubject<IEquipo | null>(null);

  selectedCampeon$ = this.selectedCampeonSubject.asObservable();
  selectedSubCampeon$ = this.selectedSubCampeonSubject.asObservable();

  teams$: Observable<IEquipo[]>;
  unselectedTeams$: Observable<IEquipo[]>;

  constructor(teamsService: TeamsService) {
    this.teams$ = teamsService.getAll();

    this.unselectedTeams$ = concat(
      this.teams$.pipe(first()),
      combineLatest([this.selectedCampeon$, this.selectedSubCampeon$]).pipe(
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

  selectCampeon(equipo: IEquipo) {
    this.selectedCampeonSubject.next(equipo);
  }

  selectSubCampeon(equipo: IEquipo) {
    this.selectedSubCampeonSubject.next(equipo);
  }
}