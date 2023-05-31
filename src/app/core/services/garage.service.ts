import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../../core/interfaces/car.interface';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class GarageService {

  readonly API_URL = "http://localhost:8080"

  readonly ENDPOINT_CARS= "/cars"
  readonly ENDPOINT_RESOURCE= "/resource"

  authenticated = false;
  headers = new HttpHeaders;
  test: any;
  errorMessage: any;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(credentials: { username: any; password: any; } | undefined,callback: (any) | undefined) {

    this.headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password), 'access-control-allow-origin':"*"
    } : {'access-control-allow-origin':"*"});
    this.httpClient.get(this.API_URL + '/user', {headers:this.headers}).subscribe({
      next :(response) => {
      if (response!=undefined) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
      },
      error: (error: { message: any; }) => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })
  }

  getCars():Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.API_URL+this.ENDPOINT_CARS, {headers:this.headers})
  }

  addCar(car: Car, callback: (any) | undefined) {
    const header= this.headers.set('Content-Type','application/json');
    const body = car;
    this.httpClient.post<any>(this.API_URL+this.ENDPOINT_CARS, body ,{headers:header}).subscribe({
      next: () => {
          return callback && callback();
      },
      error: (error: { message: any; }) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }

  deleteCar(vin: string,  callback: (any) | undefined) {
    this.httpClient.delete<any>(this.API_URL+this.ENDPOINT_CARS+"/"+vin,{headers:this.headers}).subscribe({
      next: () => {
        return callback && callback();
      },
      error: (error: { message: any; }) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }

  editCar(car: Car,  callback: (any) | undefined) {
    const header= this.headers.set('Content-Type','application/json');
    const body = car;
    this.httpClient.put<any>(this.API_URL+this.ENDPOINT_CARS+"/"+body.vin, body, {headers:header}).subscribe({
      next: () => {
        return callback && callback();
      },
      error: (error: { message: any; }) => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }

  getGreeting() {
    return this.httpClient.get(this.API_URL+this.ENDPOINT_RESOURCE, {headers:this.headers})
  }
  
}
