import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, combineLatest, filter, forkJoin, map, merge, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { Match, MatchPrediction, MatchResult, PlayedMatch } from 'src/app/classes/match';
import { MainTitleService } from 'src/app/services/main-title.service';
import { MatchesService } from 'src/app/services/matches.service';
import { ToastService } from 'src/app/services/toast.service';
import { numberUtils } from 'src/app/utils/numbers';
import { rxjsUtils } from 'src/app/utils/rxjs';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.scss']
})
export class UploadResultComponent {
  matchData?: Match;
  returnUrl$: Observable<string | null>;

  id?: number;
  formGroup?: FormGroup<{
    result1: FormControl<number>,
    result2: FormControl<number>
  }>;

  constructor(
    titleService: MainTitleService,
    private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService,
    private toastService: ToastService
  ) {
    titleService.title$.next('Cargar resultado');

    this.matchData = router.getCurrentNavigation()?.extras.state?.['match'];
    if (!this.matchData) {
      toastService.error('Error al cargar información del partido.');
    }
    else {
      const fb = new FormBuilder();
      this.formGroup = fb.group({
        result1: new FormControl<number>((<PlayedMatch>this.matchData).resultado?.[0] ?? 0, { nonNullable: true }),
        result2: new FormControl<number>((<PlayedMatch>this.matchData).resultado?.[1] ?? 0, { nonNullable: true })
      })
    }
    
    this.returnUrl$ = this.route.queryParamMap.pipe(
      map((queryParamMap) => queryParamMap.get('returnUrl'))
    );
  }

  navigateBack() {
    this.returnUrl$.subscribe((returnUrl) => {
      this.router.navigateByUrl(returnUrl || '/admin/matches/pending');
    });
  }

  uploadResult() {
    const formValue = this.formGroup!.value;
    const result: MatchResult = [ formValue.result1!, formValue.result2! ];

    this.matchesService.uploadResult(this.id!, result).pipe(
      tap((success) => {
        if (success) {
          this.toastService.success('¡Resultado guardado!');
        }
        else {
          this.toastService.error('Error al cargar el resultado.');
        }
      }),
      filter((success) => success),
      switchMap((_success) => this.matchesService.getPendingMatches()),
      map((pendingMatches) => pendingMatches.length),
      withLatestFrom(this.returnUrl$),
      map(([pendingMatchesCount, returnUrl]) => {
        if (pendingMatchesCount == 0) {
          return '/admin/matches/played';
        }
        else {
          return returnUrl || '/admin/matches/pending';
        }
      }),
    ).subscribe((afterConfirmUrl) => {
      this.router.navigateByUrl(afterConfirmUrl);
    });
  }
}