import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Match } from 'src/app/classes/match';
import { MainTitleService } from 'src/app/services/main-title.service';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-upcoming-matches-list',
  templateUrl: './upcoming-matches-list.component.html',
  styleUrls: ['./upcoming-matches-list.component.scss']
})
export class UpcomingMatchesListComponent {
  matches$: Observable<Match[]>;

  constructor(matchService: MatchesService, private router: Router) {
    this.matches$ = matchService.getUpcomingMatches();
  }

  navIngresarPrediccion(matchId: number) {
    this.router.navigateByUrl(`/matches/${matchId}/prediction`);
  }
}
