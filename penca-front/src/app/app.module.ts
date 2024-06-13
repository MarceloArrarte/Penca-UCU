import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbTabsetModule, NbRouteTabsetModule, NbCardModule,
   NbListModule, NbSelectModule, NbButtonModule, NbInputModule, NbToastrModule,
   NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatchesListComponent } from './components/views/matches-list/matches-list.component';
import { UpcomingMatchesListComponent } from './components/views/matches-list/upcoming-matches-list/upcoming-matches-list.component';
import { PlayedMatchesListComponent } from './components/views/matches-list/played-matches-list/played-matches-list.component';
import { TeamImgComponent } from './components/reutilizables/team-img/team-img.component';
import { LoginComponent } from './components/views/login/login.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { MakePredictionComponent } from './components/views/make-prediction/make-prediction.component';
import { UpDownInputComponent } from './components/up-down-input/up-down-input.component';
import { DropdownFormComponent } from './components/reutilizables/dropdown-form/dropdown-form.component';

const nebularModules = [
  NbThemeModule.forRoot({ name: 'dark' }),
  NbButtonModule,
  NbCardModule,
  NbEvaIconsModule,
  NbInputModule,
  NbLayoutModule,
  NbRouteTabsetModule,
  NbTabsetModule,
  NbListModule,
  NbSelectModule,
  NbUserModule,
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
