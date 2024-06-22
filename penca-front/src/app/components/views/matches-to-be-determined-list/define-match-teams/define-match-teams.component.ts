import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter, share, tap } from 'rxjs';
import { IEquipo } from 'src/app/classes/equipo.model';
import { MatchToBeDetermined } from 'src/app/classes/match';
import { MatchesService } from 'src/app/services/matches.service';
import { TeamSelectorService } from 'src/app/services/team-selector.service';
import { TeamsService } from 'src/app/services/teams.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-define-match-teams',
  templateUrl: './define-match-teams.component.html',
  styleUrls: ['./define-match-teams.component.scss']
})
export class DefineMatchTeamsComponent {
  matchData?: MatchToBeDetermined;
  unselectedTeams$: Observable<IEquipo[]>

  firstTeam: IEquipo | null = null;
  secondTeam: IEquipo | null = null;

  constructor(
    private router: Router,
    private matchesService: MatchesService,
    private teamSelectorService: TeamSelectorService,
    private teamsService: TeamsService,
    private toastService: ToastService
  ) {
    this.matchData = router.getCurrentNavigation()?.extras.state?.['match'];
    if (!this.matchData) {
      toastService.error('Error al cargar información del partido.');
    }

    this.unselectedTeams$ = teamSelectorService.unselectedTeams$;
  }

  navigateBack() {
    this.router.navigateByUrl('/admin/matches/to-be-determined');
  }

  onFirstTeamChange(team: IEquipo) {
    this.teamSelectorService.selectFirst(team)
  }

  onSecondTeamChange(team: IEquipo) {
    this.teamSelectorService.selectSecond(team)
  }

  sendTeamDefinition() {
    this.matchesService.sendTeamDefinition(
      this.matchData!.id,
      {
        teamIds: [ this.firstTeam!.id, this.secondTeam!.id ]
      }
    ).pipe(
      tap((success) => {
        if (success) {
          this.toastService.success('Se guardó correctamente la definición de equipos para el partido.');
        }
        else {
          this.toastService.error('Error al enviar la definición de equipos para el partido.');
        }
      }),
      filter((success) => success),
    ).subscribe(() => {
      this.router.navigateByUrl('/admin/matches/to-be-determined');
    });
  }
}
