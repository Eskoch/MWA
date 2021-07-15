import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ham } from '../hams-list/hams-list.component';
import { HamsDataService } from '../hams-data.service';

@Component({
  selector: 'app-add-ham',
  templateUrl: './add-ham.component.html',
  styleUrls: ['./add-ham.component.css']
})
export class AddHamComponent implements OnInit {
  ham : Ham = {} as Ham

  constructor(private HamsDataService: HamsDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public addHam(data:any){
    console.log(data);
    this.HamsDataService.addHam(data)
        .then(response => this.addedHam(response))
        .catch(this.handleError);
  }

  private addedHam(ham: Ham) {
    console.log("Ham added ");
    console.log(ham);
  }

  private handleError(error: any) {
    console.log("Error " + error)
  }

}
