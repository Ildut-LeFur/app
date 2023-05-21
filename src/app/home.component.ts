import { Component, OnInit } from '@angular/core';
import { GarageService } from './garage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './home.component.html',
  // providers: [ GarageService ]
})
export class HomeComponent {

  title = 'Home';
  greeting: any;
  cars: any;

  constructor(private garageService: GarageService, private http: HttpClient) {
    this.garageService.getGreeting().subscribe(data => this.greeting = data);
    this.garageService.getCars().subscribe(data => this.cars = data);
  }

  authenticated() { return this.garageService.authenticated;  }

}