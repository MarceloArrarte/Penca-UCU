import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, catchError, filter, map, of, switchMap, take, throwError } from 'rxjs';
import { Match, MatchPrediction } from 'src/app/classes/match';
import { MainTitleService } from 'src/app/services/main-title.service';
import { MatchesService } from 'src/app/services/matches.service';
import { numberUtils } from 'src/app/utils/numbers';
import { rxjsUtils } from 'src/app/utils/rxjs';

@Component({
  selector: 'app-make-prediction',
  templateUrl: './make-prediction.component.html',
  styleUrls: ['./make-prediction.component.scss']
})
export class MakePredictionComponent implements OnInit {
  matchData$: Observable<Match | undefined>;
  formGroup$?: Observable<FormGroup<{
    prediction1: FormControl<number>,
    prediction2: FormControl<number>
  }>>;

  constructor(
    titleService: MainTitleService,
    private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService
  ) {
    titleService.title$.next('Realizar predicción');
    const fb = new FormBuilder();

    this.matchData$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id') || ''),
      switchMap((id) => {        
        if (numberUtils.isInteger(id)) {
          return this.matchesService.getMatch(parseInt(id));
        }
        else {
          return throwError(() => `${id} no es un ID de partido válido`);
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(undefined);
      })
    );

    this.formGroup$ = this.matchData$.pipe(
      rxjsUtils.notNullish<Match>(),
      map((matchData) => fb.group({
          prediction1: new FormControl<number>(matchData.prediccion?.[0] ?? 0, { nonNullable: true }),
          prediction2: new FormControl<number>(matchData.prediccion?.[0] ?? 0, { nonNullable: true })
        })
      )
    );
  }

  ngOnInit(): void {
  }
}
