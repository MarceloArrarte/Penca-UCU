// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEquipo } from '../classes/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class TeamSelectorService {
  private equipos: IEquipo[] = [
    { name: 'Bolivia', picture: 'Bolivia.png' },
    { name: 'Argentina', picture: 'Argentina.png' },
    { name: 'Uruguay', picture: 'Uruguay.png' }
  ];

  private selectedCampeonSubject = new BehaviorSubject<IEquipo | null>(null);
  private selectedSubCampeonSubject = new BehaviorSubject<IEquipo | null>(null);

  selectedCampeon$ = this.selectedCampeonSubject.asObservable();
  selectedSubCampeon$ = this.selectedSubCampeonSubject.asObservable();

  getTeams() {
    return this.equipos;
  }

  selectCampeon(equipo: IEquipo) {
    this.selectedCampeonSubject.next(equipo);
  }

  selectSubCampeon(equipo: IEquipo) {
    this.selectedSubCampeonSubject.next(equipo);
  }

  filterUsers() {
    const selectedCampeon = this.selectedCampeonSubject.value;
    const selectedSubCampeon = this.selectedSubCampeonSubject.value;

    const filteredUsersForCampeon = this.equipos.filter(equipo => equipo !== selectedSubCampeon);
    const filteredUsersForSubCampeon = this.equipos.filter(equipo => equipo !== selectedCampeon);

    return { filteredUsersForCampeon, filteredUsersForSubCampeon };
  }
}