import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';
import { Observable } from 'rxjs';
import { IEquipo } from 'src/app/classes/equipo.model';


@Component({
  selector: 'app-dropdown-form',
  templateUrl: './dropdown-form.component.html',
  styleUrls: ['./dropdown-form.component.scss']
})
export class DropdownFormComponent implements OnInit {
  @Input('teams') teams$!: Observable<IEquipo[]>;
  @Input() selectedTeam: IEquipo | null = null;
  @Input() size?: NbComponentSize;
  @Output() selectedTeamChange = new EventEmitter<IEquipo>();

  ngOnInit(): void {
    if (!this.teams$) {
      console.error('Debe proveerse el @Input teams$')
    }
  }

  onTeamChange(team: IEquipo) {
    this.selectedTeamChange.emit(team);
  }
}