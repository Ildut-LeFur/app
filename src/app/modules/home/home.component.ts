import { Component } from '@angular/core';
import { GarageService } from '../../core/services/garage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {

  title = 'Home';
  greeting: any;

  constructor(private garageService: GarageService, private http: HttpClient) {
    this.garageService.authenticated?this.garageService.getGreeting().subscribe(data => this.greeting = data):{};
  }

  authenticated() { return this.garageService.authenticated;  }

}