import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainTitleService {
  title$ = new Subject<string>()

  constructor() { }
}
