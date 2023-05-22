import { Colors } from "../enums/colors.enum";

export interface Car {

    brand: string;
    model: string;
    year: number;
    color?: Colors;
    vin: string;
  }