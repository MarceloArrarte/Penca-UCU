import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IEquipo } from 'src/app/classes/equipo.model';


@Component({
  selector: 'app-dropdown-form',
  templateUrl: './dropdown-form.component.html',
  styleUrls: ['./dropdown-form.component.scss']
})
export class DropdownFormComponent{
  @Input() users: IEquipo[] = [];
  @Input() selectedUser: IEquipo | null = null;
  @Output() selectedUserChange = new EventEmitter<IEquipo>();

  onUserChange(user: any) {
    this.selectedUserChange.emit(user);
  }
}