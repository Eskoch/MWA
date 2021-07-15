import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ham } from '../hams-list/hams-list.component';
import { HamsDataService } from '../hams-data.service';


@Component({
  selector: 'app-ham-page',
  templateUrl: './ham-page.component.html',
  styleUrls: ['./ham-page.component.css']
})

export class HamPageComponent implements OnInit {

  ham : Ham = {} as Ham

  constructor(private HamsDataService: HamsDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const hamId: string = this.route.snapshot.params.hamId;
    this.getHam(hamId);
  }

  private getHam(hamId:string): void {
    this.HamsDataService.getHam(hamId)
        .then(response => this.receivedHam(response))
        .catch(this.handleError);
  }

  public deleteHamFromInside(hamId:string): void {
    this.HamsDataService.deleteHam(hamId)
        .then(() => this.DeletedHam())
        .catch(this.handleError);
  }

  public hamUpdate(hamId:string, data:any): void {
    this.HamsDataService.updateHam(hamId, data)
        .then(response => this.receivedHam(response))
        .catch(this.handleError);
  }
  
  private DeletedHam() {
    console.log("Ham deleted successfully.");
  }

  private receivedHam(ham: Ham) {
    console.log("ham-page component : updating ham ");
    console.log(ham);
    this.ham = ham;
  }
  
  private handleError(error: any) {
    console.log("Error " + error)
  }

}
