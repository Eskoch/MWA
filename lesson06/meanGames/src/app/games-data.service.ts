import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Game } from './games-list/games-list.component';
import { User } from './register-user/register-user.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private apiBaseUrl : string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public getGames() : Promise<Game[]> {
    const url:string = this.apiBaseUrl+'/games';
    return this.http.get(url).toPromise()
    .then(response => response as Game[])
    .catch(this.handleError);
  }
  public getGame(gameId: string) : Promise<Game> {
    const url:string = this.apiBaseUrl+'/games/'+gameId;
    return this.http.get(url).toPromise()
    .then(response => response as Game)
    .catch(this.handleError);
  }
  public addGame(game:Game) : Promise<Game> {
    console.log("Adding game for service method...");
    const url:string = this.apiBaseUrl+'/games/';
    return this.http.post(url, game).toPromise()
    .then(response => response as Game)
    .catch(this.handleError);
  }
  public addUser(user:User) : Promise<User> {
    console.log("Adding game user from service module...");
    const url:string = this.apiBaseUrl+'/users/';
    return this.http.post(url, user).toPromise()
    .then(response => response)
    .catch(this.handleError);
  }
  public updateGame(gameId:string, updatedGame:Game) : Promise<Game> {
    console.log("Updating game for service method...");
    console.log(updatedGame)
    const url:string = this.apiBaseUrl+'/games/'+gameId;
    return this.http.put(url, updatedGame).toPromise()
    .then(response => response as Game)
    .catch(this.handleError);
  }
  public deleteGame(gameId:string) : Promise<Game> {
    console.log("Deleting game for service method...");
    const url:string = this.apiBaseUrl+'/games/'+gameId;
    return this.http.delete(url).toPromise()
    .then(response => response as Game)
    .catch(this.handleError);
  }
  private handleError(err: any): Promise<any> {
    console.log("Something went wrong " + err);
    return Promise.reject(err.message || err);
  }
}
