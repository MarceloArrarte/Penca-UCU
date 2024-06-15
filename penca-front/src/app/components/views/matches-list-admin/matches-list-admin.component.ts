import { Component } from '@angular/core';
import { NbRouteTab } from '@nebular/theme';
import { MainTitleService } from 'src/app/services/main-title.service';

@Component({
  selector: 'app-matches-list-admin',
  templateUrl: './matches-list-admin.component.html',
  styleUrls: ['./matches-list-admin.component.scss']
})
export class MatchesListAdminComponent {
  tabs: NbRouteTab[] = [
    {
      title: 'Pendientes',
      route: './matches/pending'
    },
    {
      title: 'Finalizados',
      route: './matches/played'
    }
  ];

  constructor(mainTitleService: MainTitleService) {
    mainTitleService.title$.next('Carga de resultados');
  }
}
