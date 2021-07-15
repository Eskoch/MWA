import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesDataService } from './games-data.service';
import {  } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { OrderPipe } from './order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GamesListComponent,
    ErrorPageComponent,
    GamePageComponent,
    OrderPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomeComponent
      },
      {
        path: "games",
        component: GamesListComponent
      },
      {
        path: "game/:gameId",
        component: GamePageComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [
    GamesDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
