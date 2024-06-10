import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/matches-list/played-matches-list/played-matches-list.component';

const routes: Routes = [
  {
    path: 'matches',
    component: MatchesListComponent,
    title: 'Partidos',
    children: [
      {
        path: 'upcoming',
        component: UpcomingMatchesListComponent,
        title: 'Próximos partidos'
      },
      {
        path: 'played',
        component: PlayedMatchesListComponent,
        title: 'Partidos finalizados'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'matches/upcoming'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
