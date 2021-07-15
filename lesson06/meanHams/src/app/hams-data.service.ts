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
    console.log("Data Service method : Getting hams ")
    const url:string = this.apiBaseUrl+'/hams';
    return this.http.get(url).toPromise()
    .then(response => response as Ham[])
    .catch(this.handleError);
  }
  public getHam(hamId: string) : Promise<Ham> {
    console.log("Data Service method : Getting ham detail ")
    const url:string = this.apiBaseUrl+'/hams/'+hamId;
    return this.http.get(url).toPromise()
    .then(response => response as Ham)
    .catch(this.handleError);
  }
  public addHam(ham:Ham) : Promise<Ham> {
    console.log("Adding ham from service module...");
    const url:string = this.apiBaseUrl+'/hams/';
    return this.http.post(url, ham).toPromise()
    .then(response => response as Ham)
    .catch(this.handleError);
  }
  public addUser(user:Ham) : Promise<Ham> {
    console.log("Adding ham user from service module...");
    const url:string = this.apiBaseUrl+'/users/';
    return this.http.post(url, user).toPromise()
    .then(response => response)
    .catch(this.handleError);
  }
  public updateHam(hamId:string, updatedHam:Ham) : Promise<Ham> {
    console.log("Service : Updating ham...");
    console.log(updatedHam)
    const url:string = this.apiBaseUrl+'/hams/'+hamId;
    return this.http.put(url, updatedHam).toPromise()
    .then(response => response as Ham)
    .catch(this.handleError);
  }
  public deleteHam(hamId:string) : Promise<Ham> {
    console.log("Service method : deleting ham ");
    const url:string = this.apiBaseUrl+'/hams/'+hamId;
    return this.http.delete(url).toPromise()
    .then(response => response as Ham)
    .catch(this.handleError);
  }
  private handleError(err: any): Promise<any> {
    console.log("Something went wrong " + err);
    return Promise.reject(err.message || err);
  }
}
