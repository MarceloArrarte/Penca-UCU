import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesListComponent } from './components/views/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/views/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/views/matches-list/played-matches-list/played-matches-list.component';
import { LoginComponent } from './components/views/login/login.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { MakePredictionComponent } from './components/views/make-prediction/make-prediction.component';
import { RoleGuard } from './guard/role.guard';
import { UploadResultComponent } from './components/views/upload-result/upload-result.component';
import { MatchesListAdminComponent } from './components/views/matches-list-admin/matches-list-admin.component';
import { PlayedMatchesListAdminComponent } from './components/views/matches-list-admin/played-matches-list-admin/played-matches-list-admin.component';
import { PendingMatchesListAdminComponent } from './components/views/matches-list-admin/pending-matches-list-admin/pending-matches-list-admin.component';
import { PlayerRankingComponent } from './components/views/player-ranking/player-ranking.component';
import { MatchesToBeDeterminedListComponent } from './components/views/matches-to-be-determined-list/matches-to-be-determined-list.component';
import { DefineMatchTeamsComponent } from './components/views/matches-to-be-determined-list/define-match-teams/define-match-teams.component';
import { UserProfileComponent } from './components/views/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'matches/:id/prediction',
    component: MakePredictionComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'alumno' },
  },
  {
    path: 'matches',
    component: MatchesListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'alumno' },
    children: [
      {
        path: 'upcoming',
        component: UpcomingMatchesListComponent
      },
      {
        path: 'played',
        component: PlayedMatchesListComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'upcoming'
      }
    ]
  },
  {
    path: 'ranking',
    component: PlayerRankingComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'alumno' },
    title: 'Ranking',
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'alumno' },
  },
  {
    path: 'admin/profile',
    component: UserProfileComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/matches/:id/result',
    component: UploadResultComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/matches/to-be-determined',
    component: MatchesToBeDeterminedListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/matches/define-teams',
    component: DefineMatchTeamsComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin',
    component: MatchesListAdminComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
    children: [
      {
        path: 'matches/pending',
        component: PendingMatchesListAdminComponent
      },
      {
        path: 'matches/played',
        component: PlayedMatchesListAdminComponent
      },
      {
        path: '**',
        redirectTo: 'matches/pending',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Registro',
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
