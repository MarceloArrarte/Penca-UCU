import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, catchError, filter, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { Match, MatchPrediction } from 'src/app/classes/match';
import { MainTitleService } from 'src/app/services/main-title.service';
import { MatchesService } from 'src/app/services/matches.service';
import { ToastService } from 'src/app/services/toast.service';
import { numberUtils } from 'src/app/utils/numbers';
import { rxjsUtils } from 'src/app/utils/rxjs';

@Component({
  selector: 'app-make-prediction',
  templateUrl: './make-prediction.component.html',
  styleUrls: ['./make-prediction.component.scss']
})
export class MakePredictionComponent {
  matchData$: Observable<Match | undefined>;
  formGroup$?: Observable<FormGroup<{
    prediction1: FormControl<number>,
    prediction2: FormControl<number>
  }>>;

  id?: number;
  formGroup?: FormGroup<{
    prediction1: FormControl<number>,
    prediction2: FormControl<number>
  }>;

  constructor(
    titleService: MainTitleService,
    private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService,
    private toastService: ToastService
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
      tap((matchData) => this.id = matchData.id),
      catchError((error) => {
        toastService.error(error);
        return of(undefined);
      })
    );

    this.formGroup$ = this.matchData$.pipe(
      rxjsUtils.notNullish<Match>(),
      map((matchData) => fb.group({
          prediction1: new FormControl<number>(matchData.prediccion?.[0] ?? 0, { nonNullable: true }),
          prediction2: new FormControl<number>(matchData.prediccion?.[1] ?? 0, { nonNullable: true })
        })
      ),
      tap((formGroup) => {
        this.formGroup = formGroup;
      })
    );
  }

  navUpcomingMatches() {
    this.router.navigateByUrl('/matches/upcoming');
  }

  sendPrediction(match: Match) {
    const formValue = this.formGroup!.value;
    const prediction: MatchPrediction = [ formValue.prediction1!, formValue.prediction2! ];

    this.matchesService.sendPrediction(
      this.id!,
      {
        predictions: [
          {teamId: match.equipos[0].id, goalsPredict: prediction[0]},
          {teamId: match.equipos[1].id, goalsPredict: prediction[1]}
        ]
      }
    ).subscribe((success) => {
      if (success) {
        this.toastService.success('¡Predicción guardada!');
        this.navUpcomingMatches();
      }
      else {
        this.toastService.error('Error al enviar la predicción.');
      }
    })
  }
}
