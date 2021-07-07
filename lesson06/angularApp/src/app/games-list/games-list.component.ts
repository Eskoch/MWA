import { Component, OnInit } from '@angular/core';

import {GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  title: string="MEAN Games";
  // game1 = {
  //   title: "My First Game",
  //   price: 14.99,
  //   year: 2010
  // }
  // game2 = {
  //   title: "My First Game",
  //   price: 24.99,
  //   year: 2020
  // }
  games:Game[] = [];
  constructor(private GamesDataService:GamesDataService) { }

  
  ngOnInit(): void {
    this.getGames();
    console.log(this.games);
  }

  public getGames(): void {
    this.GamesDataService.getGames()
                          .then(foundGames => this.games = foundGames);
  }
}

export class Game {
  title: string = 'No Title';
  price: number = 0.0;
  year: number = 2000;
}
