import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HamsListComponent } from './hams-list/hams-list.component';
import { HamsDataService } from './hams-data.service';
import {  } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HamPageComponent } from './ham-page/ham-page.component';
import { OrderPipe } from './order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HamsListComponent,
    ErrorPageComponent,
    HamPageComponent,
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
        path: "hams",
        component: HamsListComponent
      },
      {
        path: "ham/:hamId",
        component: HamPageComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [
    HamsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
