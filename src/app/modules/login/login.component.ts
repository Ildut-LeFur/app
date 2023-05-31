import { Component } from '@angular/core';
import { GarageService } from '../../core/services/garage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {username: '', password: ''};
  error: any;
  constructor(private garageService: GarageService, private httpClient: HttpClient, private router: Router) {
  }

  login() {
    this.garageService.authenticate(this.credentials,() => {
      this.router.navigateByUrl('/');
    });
    return false;
  }

}