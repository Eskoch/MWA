import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})

export class AddGameComponent implements OnInit {
  constructor(private GamesDataService: GamesDataService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public addGame(data:any){
    console.log(data);
    this.GamesDataService.addGame(data)
        .then(response => this.addedGame(response))
        .catch(this.handleError);
  }

  private addedGame(game: Game) {
    console.log("Game added ");
    console.log(game);
  }

  private handleError(error: any) {
    console.log("Error " + error)
  }
}
