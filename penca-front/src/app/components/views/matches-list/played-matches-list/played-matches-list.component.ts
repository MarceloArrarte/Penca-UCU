import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayedMatch } from 'src/app/classes/match';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-played-matches-list',
  templateUrl: './played-matches-list.component.html',
  styleUrls: ['./played-matches-list.component.scss']
})
export class PlayedMatchesListComponent {
  matches$: Observable<PlayedMatch[]>;

  constructor(matchesService: MatchesService) {
    this.matches$ = matchesService.getPlayedMatches();
  }
}
