import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throttleTime } from 'rxjs';
import { Match, MatchTeams } from 'src/app/classes/match';
import { MainTitleService } from 'src/app/services/main-title.service';
import { MatchesService } from 'src/app/services/matches.service';
import { ToastService } from 'src/app/services/toast.service';
import { isFuture } from 'date-fns';

@Component({
  selector: 'app-upcoming-matches-list',
  templateUrl: './upcoming-matches-list.component.html',
  styleUrls: ['./upcoming-matches-list.component.scss']
})
export class UpcomingMatchesListComponent {
  matches$: Observable<Match[]>;

  closedPredictionsInfoEmitter$ = new Subject<string>();

  constructor(
    matchService: MatchesService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.matches$ = matchService.getUpcomingMatches();

    this.closedPredictionsInfoEmitter$.pipe(
      throttleTime(3000)
    ).subscribe((message) => 
      this.toastService.info(message, 'Predicciones cerradas')
    );
  }

  navIngresarPrediccion(matchId: number): void {
    this.router.navigateByUrl(`/matches/${matchId}/prediction`);
  }

  mostrarInfoPrediccionesCerradas(match: Match): void {
    const action = match.prediccion ? 'modificar' : 'ingresar';

    if (isFuture(match.datetime)) {
      const minutesToStart = match.remainingMinutesToStart;
      this.closedPredictionsInfoEmitter$.next(
        `Solo puedes ${action} predicciones hasta una hora antes del partido.`
        + ` El partido ${match.equipos.join(' - ')} comenzará en ${minutesToStart} minutos.`
      );
    }
    else {
      const elapsedMinutes = match.elapsedMinutes;
      this.closedPredictionsInfoEmitter$.next(
        `Solo puedes ${action} predicciones hasta una hora antes del partido.`
        + ` El partido ${match.equipos.join(' - ')} comenzó hace ${elapsedMinutes} minutos.`
      );
    }
  }
}
