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
  matchData?: Match;

  formGroup?: FormGroup<{
    prediction1: FormControl<number>,
    prediction2: FormControl<number>
  }>;
  returnUrl$: Observable<string | null>;

  constructor(
    titleService: MainTitleService,
    private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService,
    private toastService: ToastService
  ) {
    titleService.title$.next('Realizar predicción');

    this.matchData = router.getCurrentNavigation()?.extras.state?.['match'];
    if (!this.matchData) {
      toastService.error('Error al cargar información del partido.');
    }
    else {
      const fb = new FormBuilder();
      this.formGroup = fb.group({
        prediction1: new FormControl<number>(this.matchData.prediccion?.[0] ?? 0, { nonNullable: true }),
        prediction2: new FormControl<number>(this.matchData.prediccion?.[1] ?? 0, { nonNullable: true })
      })
    }
    
    this.returnUrl$ = this.route.queryParamMap.pipe(
      map((queryParamMap) => queryParamMap.get('returnUrl'))
    );
  }

  navUpcomingMatches() {
    this.router.navigateByUrl('/matches/upcoming');
  }

  sendPrediction(match: Match) {
    const formValue = this.formGroup!.value;
    const prediction: MatchPrediction = [ formValue.prediction1!, formValue.prediction2! ];

    this.matchesService.sendPrediction(
      match.id,
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
