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

  private receivedHam(ham: Ham) {
    console.log("Ham received " + ham);
    this.ham = ham;
  }
  
  private handleError(error: any) {
    console.log("Error " + error)
  }

}
