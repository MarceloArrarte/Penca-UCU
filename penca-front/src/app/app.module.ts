import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbTabsetModule, NbRouteTabsetModule, NbCardModule,
   NbListModule, NbSelectModule, NbButtonModule, NbInputModule, NbToastrModule,
   NbUserModule, NbActionsModule,
   NbDialogModule,
   NbTagModule,
   NbIconModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatchesListComponent } from './components/views/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/views/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/views/matches-list/played-matches-list/played-matches-list.component';
import { TeamImgComponent } from './components/reutilizables/team-img/team-img.component';
import { LoginComponent } from './components/views/login/login.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakePredictionComponent } from './components/views/make-prediction/make-prediction.component';
import { UpDownInputComponent } from './components/reutilizables/up-down-input/up-down-input.component';
import { DropdownFormComponent } from './components/reutilizables/dropdown-form/dropdown-form.component';
import { UploadResultComponent } from './components/views/upload-result/upload-result.component';
import { MatchesListAdminComponent } from './components/views/matches-list-admin/matches-list-admin.component';
import { PendingMatchesListAdminComponent } from './components/views/matches-list-admin/pending-matches-list-admin/pending-matches-list-admin.component';
import { PlayedMatchesListAdminComponent } from './components/views/matches-list-admin/played-matches-list-admin/played-matches-list-admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { PlayerRankingComponent } from './components/views/player-ranking/player-ranking.component';
import { BottomNavComponent } from './components/views/bottom-nav/bottom-nav.component';
import { MatchesToBeDeterminedListComponent } from './components/views/matches-to-be-determined-list/matches-to-be-determined-list.component';
import { DefineMatchTeamsComponent } from './components/views/matches-to-be-determined-list/define-match-teams/define-match-teams.component';
import { UserProfileComponent } from './components/views/user-profile/user-profile.component';

const nebularModules = [
  NbThemeModule.forRoot({ name: 'dark' }),
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule.forRoot(),
  NbEvaIconsModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbRouteTabsetModule,
  NbTabsetModule,
  NbListModule,
  NbSelectModule,
  NbUserModule,
  NbTagModule,
  NbToastrModule.forRoot()
];


@NgModule({
  declarations: [
    AppComponent,
    MatchesListComponent,
    UpcomingMatchesListComponent,
    PlayedMatchesListComponent,
    TeamImgComponent,
    LoginComponent,
    SignUpComponent,
    DropdownFormComponent,
    MakePredictionComponent,
    UpDownInputComponent,
    UploadResultComponent,
    MatchesListAdminComponent,
    PendingMatchesListAdminComponent,
    PendingMatchesListAdminComponent,
    PlayedMatchesListAdminComponent,
    PlayedMatchesListAdminComponent,
    PlayerRankingComponent,
    BottomNavComponent,
    MatchesToBeDeterminedListComponent,
    DefineMatchTeamsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...nebularModules
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
