// src/app/sign-up/sign-up.component.ts
import { Component, OnInit } from '@angular/core';
import { TeamSelectorService } from 'src/app/services/team-selector.service';
import { IEquipo } from 'src/app/classes/equipo.model';
import { TeamsService } from 'src/app/services/teams.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [TeamSelectorService]
})
export class SignUpComponent {
  nombre: string = '';
  documento: string = '';
  email: string = '';
  contrasena: string = '';
  selectedCampeon: IEquipo | null = null;
  selectedSubCampeon: IEquipo | null = null;

  unselectedTeams$: Observable<IEquipo[]>;

  constructor(private teamSelectorService: TeamSelectorService) {
    this.unselectedTeams$ = teamSelectorService.unselectedTeams$;

  }

  onCampeonChange(selectedTeam: IEquipo) {
    this.teamSelectorService.selectCampeon(selectedTeam);
  }

  onSubCampeonChange(selectedTeam: IEquipo) {
    this.teamSelectorService.selectSubCampeon(selectedTeam);
  }
}