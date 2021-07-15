import { Inject, Injectable } from '@angular/core';

import { BROWSER_STORAGE } from './storage';
import { GamesDataService } from './games-data.service';

export class Credentials {
  username!: string;
  password!: string;
  name!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, 
  private GamesDataService:GamesDataService) { }
  
  public saveToken(token: string) {
    this.storage.setItem("games-token", token);
  }

  public gettoken(): string {
    return this.storage.getItem("games-token") as string;
  }

  public login(credentials: Credentials): Promise<any> {
    return this.GamesDataService.login(credentials);
  }

  public logout(): void {
    this.storage.removeItem("games-token");
  }

  public isLogedIn(): boolean {
    const token: string = this.gettoken();
    if(token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if(payload.exp > (Date.now()/1000)) {
        return true;
      } else {
        this.logout();
        return false;
      }
    } else {
      return false;
    }
  }

  public getCurrentName(): string {
    if(this.isLogedIn()) {
      const token: string = this.gettoken();
      const {name} = JSON.parse(atob(token.split(".")[1]));
      return name;
    } else {
      return "";
    }
  }
}
