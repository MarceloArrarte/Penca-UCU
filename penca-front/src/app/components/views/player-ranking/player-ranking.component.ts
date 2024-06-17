import { Component } from '@angular/core';
import { MainTitleService } from 'src/app/services/main-title.service';

interface Player {
  rank: number;
  name: string;
  totalScore: number;
}

@Component({
  selector: 'app-player-ranking',
  templateUrl: './player-ranking.component.html',
  styleUrls: ['./player-ranking.component.scss']
})
export class PlayerRankingComponent {

  constructor(mainTitleService: MainTitleService) {
    mainTitleService.title$.next('Ranking de jugadores');
  }
  players: Player[] = [
    { rank: 1, name: 'Marcelo Arrarte', totalScore: 11 },
    { rank: 2, name: 'Joel Alayón', totalScore: 9 },
    { rank: 3, name: 'Agustin Benitez', totalScore: 8 },
    { rank: 4, name: 'Diego Forlan', totalScore: 7 },
    { rank: 5, name: 'Luis Suarez', totalScore: 4 },
    { rank: 6, name: 'Fernando Machado', totalScore: 4 },
    { rank: 7, name: 'Camilo Ferreira', totalScore: 3 },
    { rank: 8, name: 'Lucas Garcia', totalScore: 2 },
    { rank: 9, name: 'John Doe', totalScore: 2 },
    { rank: 10, name: 'Jane Smith', totalScore: 2 },
    { rank: 11, name: 'Alice Johnson', totalScore: 1 },
    { rank: 12, name: 'Bob Brown', totalScore: 1 },
    { rank: 13, name: 'Carol White', totalScore: 1 },
    { rank: 14, name: 'David Green', totalScore: 1 },
    { rank: 15, name: 'Eve Black', totalScore: 1 },
    { rank: 16, name: 'Frank Blue', totalScore: 1 },
    { rank: 17, name: 'Grace Pink', totalScore: 1 },
    { rank: 18, name: 'Hank Grey', totalScore: 1 },
    { rank: 19, name: 'Ivy Gold', totalScore: 1 },
    { rank: 20, name: 'Jack Silver', totalScore: 1 },
  ];
}