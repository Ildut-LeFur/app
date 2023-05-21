import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GarageService {

  readonly API_URL = "http://localhost:8080"

  readonly ENDPOINT_CARS= "/cars"
  readonly ENDPOINT_RESOURCE= "/resource"

  authenticated = false;
  headers = new HttpHeaders;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(credentials: { username: any; password: any; } | undefined,callback: (any) | undefined) {

    this.headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username +':' + credentials.password),'access-control-allow-origin':"*"
    } : {'access-control-allow-origin':"*"});
    this.httpClient.get(this.API_URL+'/user', {headers:this.headers}).subscribe(response => {
    
    if (response!=undefined) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    return callback && callback();
  })

}

  getCars() {
    
    return this.httpClient.get(this.API_URL+this.ENDPOINT_CARS, {headers:this.headers})
  }
  getGreeting() {
    return this.httpClient.get(this.API_URL+this.ENDPOINT_RESOURCE, {headers:this.headers})
  }
  
}
