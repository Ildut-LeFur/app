import { Component } from '@angular/core';

import { GarageService } from './core/services/garage.service';

import { OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ GarageService ]
})
export class AppComponent implements OnInit {
  title = 'garageApp';

  constructor(private garageService: GarageService, private httpClient: HttpClient, private router: Router) {
    this.garageService;
  }

  logout() {
    // this.httpClient.post('logout',{}).pipe(
    //   finalize(() => {
    //   this.garageService.authenticated = false;
    //   this.router.navigateByUrl('/login');
    // })).subscribe();
    this.garageService.authenticated = false;
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
      console.log("On init.....")
  }

  authenticated() { return this.garageService.authenticated;  }
}
