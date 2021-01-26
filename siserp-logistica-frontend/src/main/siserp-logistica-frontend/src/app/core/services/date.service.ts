import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  parseGuionDDMMYYYY(date: String | Date): Date {
    if (date) {
      return new Date(date.toString().replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    } else {
      return null;
    }
  }
}
