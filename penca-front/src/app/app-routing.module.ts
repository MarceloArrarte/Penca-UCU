import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesListComponent } from './components/views/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/views/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/views/matches-list/played-matches-list/played-matches-list.component';
import { LoginComponent } from './components/views/login/login.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/matches-list/played-matches-list/played-matches-list.component';
import { MakePredictionComponent } from './components/make-prediction/make-prediction.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RoleGuard } from './guard/role.guard';

const routes: Routes = [
  {
    path: 'matches',
    component: MatchesListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'alumno, admin' },
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
