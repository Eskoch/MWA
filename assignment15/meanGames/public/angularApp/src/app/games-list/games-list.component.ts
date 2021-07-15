import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit {
  title:string = "MEAN Games";
  games:Game[] = [];
  constructor(private GamesDataService:GamesDataService) { }

  
  ngOnInit(): void {
    this.getGames();
  }

  public getGames(): void {
    this.GamesDataService.getGames()
        .then(foundGames => this.games = foundGames)
        .catch(error => {
          console.log(error);
          alert(error);
        })
  }
}

export class Game {
  _id!: string;
  title!: string;
  price!: number;
  year!: number;
  designers!: string;
  minPlayers!: number;
  maxPlayers!: number;
  rate!: number;
  reviews!: string;
  minAge!: string;
}
