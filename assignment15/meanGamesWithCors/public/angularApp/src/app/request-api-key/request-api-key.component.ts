import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-request-api-key',
  templateUrl: './request-api-key.component.html',
  styleUrls: ['./request-api-key.component.css']
})
export class RequestApiKeyComponent implements OnInit {
  name!: string;
  email!: string;
  domain!: number;

  constructor(private GamesDataService: GamesDataService) { }

  ngOnInit(): void {
  }

  public requestApiKey(data:any){
    console.log("Request api key compnonent : sending request");
    console.log(data);
    this.GamesDataService.addRequest(data)
        .then(response => this.addedRequest(response))
        .catch(this.handleError);
  }

  private addedRequest(request: Request) {
    console.log("Added Request : Request added ");
    console.log(request);
  }

  private handleError(error: any) {
    console.log("Error " + error)
  }
}

export class Request {
  name!: string;
  email!: string;
  domain!: number;
}