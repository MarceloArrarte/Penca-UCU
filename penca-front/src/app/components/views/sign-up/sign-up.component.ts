// src/app/sign-up/sign-up.component.ts
import { Component, OnInit } from '@angular/core';
import { TeamSelectorService } from 'src/app/services/team-selector.service';
import { IEquipo } from 'src/app/classes/equipo.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  nombre: string = '';
  documento: string = '';
  email: string = '';
  contrasena: string = '';
  selectedCampeon: IEquipo | null = null;
  selectedSubCampeon: IEquipo | null = null;

  users: IEquipo[] = [];
  filteredUsersForCampeon: IEquipo[] = [];
  filteredUsersForSubCampeon: IEquipo[] = [];

  constructor(private teamSelectorService: TeamSelectorService) {}

  ngOnInit() {
    this.users = this.teamSelectorService.getTeams();
    this.filteredUsersForCampeon = [...this.users];
    this.filteredUsersForSubCampeon = [...this.users];

    this.teamSelectorService.selectedCampeon$.subscribe(selectedUser => {
      this.selectedCampeon = selectedUser;
      this.updateFilteredUsers();
    });

    this.teamSelectorService.selectedSubCampeon$.subscribe(selectedUser => {
      this.selectedSubCampeon = selectedUser;
      this.updateFilteredUsers();
    });
  }

  onCampeonChange(selectedUser: IEquipo) {
    this.teamSelectorService.selectCampeon(selectedUser);
  }

  onSubCampeonChange(selectedUser: IEquipo) {
    this.teamSelectorService.selectSubCampeon(selectedUser);
  }

  updateFilteredUsers() {
    const { filteredUsersForCampeon, filteredUsersForSubCampeon } = this.teamSelectorService.filterUsers();
    this.filteredUsersForCampeon = filteredUsersForCampeon;
    this.filteredUsersForSubCampeon = filteredUsersForSubCampeon;
  }
}