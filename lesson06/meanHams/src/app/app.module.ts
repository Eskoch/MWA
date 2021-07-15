import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HamsListComponent } from './hams-list/hams-list.component';
import { HamsDataService } from './hams-data.service';
import {  } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HamPageComponent } from './ham-page/ham-page.component';
import { OrderPipe } from './order.pipe';
import { AddHamComponent } from './add-ham/add-ham.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HamsListComponent,
    ErrorPageComponent,
    HamPageComponent,
    OrderPipe,
    AddHamComponent,
    RegisterUserComponent
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
        path: "hams",
        component: HamsListComponent
      },
      {
        path: "ham/:hamId",
        component: HamPageComponent
      },
      {
        path: "addHam",
        component: AddHamComponent
      },
      {
        path: "register",
        component: RegisterUserComponent
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
