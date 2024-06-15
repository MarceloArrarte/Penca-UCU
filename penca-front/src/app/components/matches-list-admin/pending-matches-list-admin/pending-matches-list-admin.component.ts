import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isFuture } from 'date-fns';
import { Observable, Subject, throttleTime } from 'rxjs';
import { Match } from 'src/app/classes/match';
import { MatchesService } from 'src/app/services/matches.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pending-matches-list-admin',
  templateUrl: './pending-matches-list-admin.component.html',
  styleUrls: ['./pending-matches-list-admin.component.scss']
})
export class PendingMatchesListAdminComponent {
  matches$: Observable<Match[]>;

  constructor(
    matchService: MatchesService,
    private router: Router
  ) {
    this.matches$ = matchService.getPendingMatches();
  }

  navCargarResultado(matchId: number): void {
    this.router.navigateByUrl(`/admin/matches/${matchId}/result?returnUrl=/admin/matches/pending`);
  }
}
