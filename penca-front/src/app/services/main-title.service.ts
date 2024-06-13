import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainTitleService {
  title$ = new Subject<string>()

  constructor(htmlTitleService: Title) {
    this.title$.subscribe((value) => htmlTitleService.setTitle(value))
  }
}
