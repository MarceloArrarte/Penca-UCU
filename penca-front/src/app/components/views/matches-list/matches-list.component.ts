import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbRouteTab, NbRouteTabsetComponent, NbTabsetComponent } from '@nebular/theme';
import { MainTitleService } from 'src/app/services/main-title.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent {
  tabs: NbRouteTab[] = [
    {
      title: 'Próximos',
      route: './upcoming'
    },
    {
      title: 'Finalizados',
      route: './played'
    }
  ];

  // @ViewChild(NbRouteTabsetComponent)
  // tabset!: NbRouteTabsetComponent;

  constructor(mainTitleService: MainTitleService) {
    mainTitleService.title$.next('Partidos');
  }

  // ngAfterViewInit(): void {
  //   this.tabset.selectTab(this.tabset.tabs[0]);
  // }
}
