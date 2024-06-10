import { Component } from '@angular/core';
import { MainTitleService } from './services/main-title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  h1Title$: Observable<string>;

  constructor(mainTitleService: MainTitleService) {
    this.h1Title$ = mainTitleService.title$.asObservable();
  }
}
