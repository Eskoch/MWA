import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../games-list/games-list.component';
import { GamesDataService } from '../games-data.service';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})

export class GamePageComponent implements OnInit {

  title!:string;
  price!:number;
  rate!:number;
  minPlayers!:number;
  maxPlayers!:number;
  minAge!:number;
  designers!:string;
  year!:Date;

  game : Game = {} as Game

  constructor(private GamesDataService: GamesDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const gameId: string = this.route.snapshot.params.gameId;
    this.getGame(gameId);
  }

  public getGame(gameId:string): void {
    this.GamesDataService.getGame(gameId)
        .then(response => this.receivedGame(response))
        .catch(this.handleError);
  }

  public deleteGameFromInside(gameId:string): void {
    this.GamesDataService.deleteGame(gameId)
        .then(() => this.DeletedGame())
        .catch(this.handleError);
  }

  public gameUpdate(gameId:string, data:any): void {
    this.GamesDataService.updateGame(gameId, data)
        .then(response => this.receivedGame(response))
        .catch(this.handleError);
  }

  private DeletedGame() {
    console.log("Game deleted successfully.");
  }

  private receivedGame(game: Game) {
    console.log("Game received " + game);
    this.game = game;
  }
  
  private handleError(error: any) {
    console.log("Error " + error)
  }

}
