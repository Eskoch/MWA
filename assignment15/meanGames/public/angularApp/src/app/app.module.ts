import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesDataService } from './games-data.service';
import {  } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { OrderPipe } from './order.pipe';
import { AddGameComponent } from './add-game/add-game.component';
import { UpdateGameComponent } from './update-game/update-game.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RequestApiKeyComponent } from './request-api-key/request-api-key.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GamesListComponent,
    ErrorPageComponent,
    GamePageComponent,
    OrderPipe,
    AddGameComponent,
    UpdateGameComponent,
    RegisterUserComponent,
    RequestApiKeyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
        path: "add-new-game",
        component: AddGameComponent
      },
      {
        path: "register",
        component: RegisterUserComponent
      },
      {
        path: "requestApiKey",
        component: RequestApiKeyComponent
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
