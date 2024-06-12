import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/matches-list/played-matches-list/played-matches-list.component';
import { MakePredictionComponent } from './components/make-prediction/make-prediction.component';

const routes: Routes = [
  {
    path: 'matches',
    component: MatchesListComponent,
    children: [
      {
        path: 'upcoming',
        component: UpcomingMatchesListComponent
      },
      {
        path: 'played',
        component: PlayedMatchesListComponent
      }
    ]
  },
  {
    path: 'matches/:id/prediction',
    component: MakePredictionComponent,

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
