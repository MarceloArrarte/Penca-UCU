import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { MainTitleService } from 'src/app/services/main-title.service';
import { UserScore, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-player-ranking',
  templateUrl: './player-ranking.component.html',
  styleUrls: ['./player-ranking.component.scss']
})
export class PlayerRankingComponent {

  users$: Observable<UserScore[]>;
  currentUserDocument: string;

  constructor(mainTitleService: MainTitleService, usersService: UsersService, authHelper: AuthHelperService) {
    mainTitleService.title$.next('Ranking de jugadores');
    this.users$ = usersService.getRanking();
    this.currentUserDocument = authHelper.getDocument()!;
  }
}