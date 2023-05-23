import { Component, ViewChild } from '@angular/core';

import { GarageService } from '../../core/services/garage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/core/interfaces/car.interface';
import { Colors } from 'src/app/core/enums/colors.enum';


  

@Component({
  templateUrl: './garage.component.html',
})
export class GarageComponent {
  title = 'Garage';

  displayedColumns: string[] = ['brand', 'model', 'year', 'color' ,'vin'];
  dataSource :MatTableDataSource<Car>= new MatTableDataSource<Car>();
  car:Car = {
    brand: "", model: "",
    year: 0,
    vin: ''
  };

  ColorsEnum = Colors;
  keys = Object.keys;

  constructor(private garageService: GarageService, private httpClient: HttpClient, private router: Router) {
    this.garageService.authenticated?this.load():{};
  }

  load() : void {
    this.garageService.getCars().subscribe((data: Car[]) => this.dataSource.data = data);
  }

  authenticated() { return this.garageService.authenticated;  }

  add(){
    this.garageService.addCar(this.car, () => this.load());
  }

  delete(){
    this.garageService.deleteCar(this.car.vin, () => this.load());
  }
}

