// src/app/sign-up/sign-up.component.ts
import { Component, OnInit } from '@angular/core';
import { TeamSelectorService } from 'src/app/services/team-selector.service';
import { IEquipo } from 'src/app/classes/equipo.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [TeamSelectorService]
})
export class SignUpComponent implements OnInit {
  nombre: string = '';
  documento: string = '';
  email: string = '';
  contrasena: string = '';
  selectedCampeon: IEquipo | null = null;
  selectedSubCampeon: IEquipo | null = null;

  teams: IEquipo[] = [];
  filteredTeamsForCampeon: IEquipo[] = [];
  filteredTeamsForSubCampeon: IEquipo[] = [];

  constructor(private teamSelectorService: TeamSelectorService) {}

  ngOnInit() {
    this.teams = this.teamSelectorService.getTeams();
    this.filteredTeamsForCampeon = [...this.teams];
    this.filteredTeamsForSubCampeon = [...this.teams];

    this.teamSelectorService.selectedCampeon$.subscribe(selectedUser => {
      this.selectedCampeon = selectedUser;
      this.updateFilteredTeams();
    });

    this.teamSelectorService.selectedSubCampeon$.subscribe(selectedUser => {
      this.selectedSubCampeon = selectedUser;
      this.updateFilteredTeams();
    });
  }

  onCampeonChange(selectedUser: IEquipo) {
    this.teamSelectorService.selectCampeon(selectedUser);
  }

  onSubCampeonChange(selectedUser: IEquipo) {
    this.teamSelectorService.selectSubCampeon(selectedUser);
  }

  updateFilteredTeams() {
    const { filteredTeamsForCampeon, filteredTeamsForSubCampeon } = this.teamSelectorService.filterTeams();
    this.filteredTeamsForCampeon = filteredTeamsForCampeon;
    this.filteredTeamsForSubCampeon = filteredTeamsForSubCampeon;
  }
}