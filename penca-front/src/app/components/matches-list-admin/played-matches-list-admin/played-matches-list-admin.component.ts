import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayedMatch } from 'src/app/classes/match';
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

  navCargarResultado(matchId: number): void {
    this.router.navigateByUrl(`/admin/matches/${matchId}/result?returnUrl=/admin/matches/played`);
  }
}
