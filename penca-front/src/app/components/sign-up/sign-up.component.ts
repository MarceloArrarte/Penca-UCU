import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  nombre: string = '';
  documento: string = '';
  email: string = '';
  contrasena: string = '';

  constructor() {}
}