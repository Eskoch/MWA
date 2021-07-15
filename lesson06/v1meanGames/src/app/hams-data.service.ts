import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ham } from './hams-list/hams-list.component';

@Injectable({
  providedIn: 'root'
})
export class HamsDataService {

  private apiBaseUrl : string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public getHams() : Promise<Ham[]> {
    const url:string = this.apiBaseUrl+'/hams';
    return this.http.get(url).toPromise()
    .then(response => response as Ham[])
    .catch(this.handleError);
  }
  public getHam(hamId: string) : Promise<Ham> {
    const url:string = this.apiBaseUrl+'/hams/'+hamId;
    return this.http.get(url).toPromise()
    .then(response => response as Ham)
    .catch(this.handleError);
  }
  private handleError(err: any): Promise<any> {
    console.log("Something went wrong " + err);
    return Promise.reject(err.message || err);
  }
}
