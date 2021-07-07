import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Game } from './games-list/games-list.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private apiBaseUrl : string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public getGames() : Promise<Game[]> {
    const url: string = this.apiBaseUrl+'/games';
    return this.http.get(url).toPromise()
    .then(response => response as Game[])
    .catch(this.handleError);
  }
  private handleError(err: any): Promise<any> {
    console.log("Something went wrong " + err);
    return Promise.reject(err.message || err);
  }
}