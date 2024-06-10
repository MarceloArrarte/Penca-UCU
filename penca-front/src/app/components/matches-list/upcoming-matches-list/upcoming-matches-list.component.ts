import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PendingMatch } from 'src/app/classes/match';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-upcoming-matches-list',
  templateUrl: './upcoming-matches-list.component.html',
  styleUrls: ['./upcoming-matches-list.component.scss']
})
export class UpcomingMatchesListComponent {
  matches$: Observable<PendingMatch[]>;

  constructor(matchService: MatchesService) {
    this.matches$ = matchService.getUpcomingMatches();
  }
}
