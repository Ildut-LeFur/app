import { Component } from '@angular/core';

import { GarageService } from './garage.service';

import { OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GarageService ]
})
export class AppComponent implements OnInit {
  title = 'garageApp';
  cars: any;
  greeting: any;

  constructor(private garageService: GarageService, private httpClient: HttpClient, private router: Router) {
    this.garageService.authenticate(undefined,undefined)
  }

  logout() {
    this.httpClient.post('logout',{}).pipe(
      finalize(() => {
      this.garageService.authenticated = false;
      this.router.navigateByUrl('/login');
    })).subscribe();
  }

  ngOnInit(): void {
      console.log("On init.....")
      this.garageService.getCars().subscribe((datas) => {
        this.cars = datas;
        console.log(datas);
      })
      this.garageService.getGreeting().subscribe((datas) => {
        this.greeting = datas;
        console.log(datas);
      })
  }
}
