import { Observable, ReplaySubject, map, take } from 'rxjs';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class ApiService {
  protected apiUrl$: Observable<string>;

  constructor(protected http: HttpClient, configService: ConfigService) {
    this.apiUrl$ = configService.appConfig$.pipe(
      map((config) => config.apiUrl)
    );
  }
}

export interface ApiError {
  error: string;
}