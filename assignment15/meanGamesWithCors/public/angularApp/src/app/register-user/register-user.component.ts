import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  username!:string;
  password!:string;
  name!:String;

  constructor(private GamesDataService: GamesDataService) { }

  ngOnInit(): void {
  }

  public addUser(data:any){
    console.log("register-user componenet : addUser method called.")
    console.log(data);
    this.GamesDataService.addUser(data)
        .then(response => this.addedUser(response))
        .catch(this.handleError);
  }

  private addedUser(user: any) {
    console.log("User added ");
    console.log(user);
  }

  private handleError(error: any) {
    console.log("Error " + error)
  }

}

export class User {
  username!:string;
  password!:string;
  name!:String;
}
