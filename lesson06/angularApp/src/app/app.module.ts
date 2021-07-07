import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesDataService } from './games-data.service';
import {  } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GamesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GamesDataService
  ],
  bootstrap: [GamesListComponent]
})
export class AppModule { }
