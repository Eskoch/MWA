import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent implements OnInit {

  constructor(private GamesDataService: GamesDataService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public updateGame(gameId:string, data:any): void {
    this.GamesDataService.updateGame(gameId, data)
        .then(response => this.receivedGame(response))
        .catch(this.handleError);
  }

  private receivedGame(game: Game) {
    console.log("Game updated successfully ");
  }

  private handleError(error: any) {
    console.log("Error " + error)
  }

}
