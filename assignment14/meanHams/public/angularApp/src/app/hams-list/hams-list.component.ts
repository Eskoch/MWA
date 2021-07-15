import { Component, OnInit } from '@angular/core';

import { HamsDataService } from '../hams-data.service';

@Component({
  selector: 'app-hams-list',
  templateUrl: './hams-list.component.html',
  styleUrls: ['./hams-list.component.css']
})

export class HamsListComponent implements OnInit {
  title:string = "MEAN Hams";
  hams:Ham[] = [];
  constructor(private HamsDataService:HamsDataService) { }

  ngOnInit(): void {
    this.getHams();
  }

  public getHams(): void {
    this.HamsDataService.getHams()
        .then(foundHams => this.hams = foundHams);
  }
}

export class Ham {
  _id!: string;
  name!: string;
  type!: [];
  contests!: {};
}
