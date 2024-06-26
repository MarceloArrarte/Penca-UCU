import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
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

  formGroup?: FormGroup<{
    result1: FormControl<number>,
    result2: FormControl<number>,
    penalti1?: FormControl<number>,
    penalti2?: FormControl<number>
  }>;


  @ViewChild('dialog')
  penaltiDialog!: TemplateRef<any>;
  dialogRef?: NbDialogRef<any>;

  constructor(
    titleService: MainTitleService,
    private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService,
    private toastService: ToastService,
    private dialogService: NbDialogService
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

  closeDialog(confirmed: boolean) {
    if (confirmed) {
      const formValue = this.formGroup!.value;
      this.dialogRef!.close([formValue.penalti1!, formValue.penalti2]);
    }
    else {
      this.dialogRef!.close(null);
    }
  }

  confirm(match: Match) {
    const formValue = this.formGroup!.value;

    if (match.fase.toLowerCase().includes('final') && formValue.result1 == formValue.result2) {
      this.formGroup!.addControl('penalti1', new FormControl(0, { nonNullable: true }))
      this.formGroup!.addControl('penalti2', new FormControl(0, { nonNullable: true }))

      this.dialogRef = this.dialogService.open(this.penaltiDialog);
      this.dialogRef.onClose.subscribe((penaltis: [number, number] | null) => {
        if (penaltis) {
          this.uploadResult(match, penaltis);
        }
      });
    }
    else {
      this.uploadResult(match);
    }
  }

  uploadResult(match: Match, penalesGoals?: [number, number]) {
    const formValue = this.formGroup!.value;

    this.matchesService.uploadResult(
      match.id,
      {
        result: [
          { teamId: match.equipos[0].id, goals: formValue.result1!, penalesGoals: penalesGoals?.[0] },
          { teamId: match.equipos[1].id, goals: formValue.result2!, penalesGoals: penalesGoals?.[1] }
        ]
      }
    ).pipe(
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