import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup<{
    email: FormControl<string | null>,
    password: FormControl<string | null>
  }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private toastService: ToastService) {}

  login() {
    let data: Parameters<typeof this.authService.login>[0] = {
      email: this.formGroup.value.email!,
      password: this.formGroup.value.password!
    }

    this.authService.login(data).pipe(
      filter((result) => result)
    ).subscribe(() => this.toastService.success('¡Sesión iniciada!'));
  }
}
