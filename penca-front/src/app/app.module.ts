import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbTabsetModule, NbRouteTabsetModule, NbCardModule, NbButtonModule, NbInputModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/matches-list/played-matches-list/played-matches-list.component';
import { TeamImgComponent } from './components/team-img/team-img.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { MakePredictionComponent } from './components/make-prediction/make-prediction.component';
import { UpDownInputComponent } from './components/up-down-input/up-down-input.component';

const nebularModules = [
  NbThemeModule.forRoot({ name: 'dark' }),
  NbButtonModule,
  NbCardModule,
  NbEvaIconsModule,
  NbInputModule,
  NbLayoutModule,
  NbRouteTabsetModule,
  NbTabsetModule,
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
    MakePredictionComponent,
    UpDownInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...nebularModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
