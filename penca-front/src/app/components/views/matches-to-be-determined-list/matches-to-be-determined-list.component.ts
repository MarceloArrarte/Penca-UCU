import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchTeams, MatchToBeDetermined } from 'src/app/classes/match';
import { MainTitleService } from 'src/app/services/main-title.service';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-matches-to-be-determined-list',
  templateUrl: './matches-to-be-determined-list.component.html',
  styleUrls: ['./matches-to-be-determined-list.component.scss']
})
export class MatchesToBeDeterminedListComponent {
  matchesToBeDetermined$: Observable<MatchToBeDetermined[]>;
  dummyTeam: MatchTeams[number] = {
    id: -1,
    name: 'Por definirse'
  };

  constructor(mainTitleService: MainTitleService, matchesService: MatchesService) {
    mainTitleService.title$.next('Definición de equipos')
    this.matchesToBeDetermined$ = matchesService.getMatchesToBeDetermined();
  }

  navDefinirEquipos(match: MatchToBeDetermined) {
    alert('llega')
  }
}
