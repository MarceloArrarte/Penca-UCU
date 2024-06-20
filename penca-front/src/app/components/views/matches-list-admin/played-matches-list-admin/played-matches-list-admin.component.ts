import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Match, PlayedMatch } from 'src/app/classes/match';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-played-matches-list-admin',
  templateUrl: './played-matches-list-admin.component.html',
  styleUrls: ['./played-matches-list-admin.component.scss']
})
export class PlayedMatchesListAdminComponent {
  matches$: Observable<PlayedMatch[]>;

  constructor(matchesService: MatchesService, private router: Router) {
    this.matches$ = matchesService.getPlayedMatches();
  }

  navCargarResultado(match: PlayedMatch): void {
    this.router.navigateByUrl(
      `/admin/matches/${match.id}/result?returnUrl=/admin/matches/played`,
      { state: { match }}
    );
  }
}
