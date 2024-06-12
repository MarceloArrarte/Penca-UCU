import { Component } from '@angular/core';
import { MainTitleService } from './services/main-title.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  h1Title$: Observable<string>;

  constructor(mainTitleService: MainTitleService, private authService: AuthService) {
    this.h1Title$ = mainTitleService.title$.asObservable();
  }

  get isAutenticated(){
    return this.authService.isAuthenticated();
  }

}
