import { Injectable } from '@angular/core';
import { formatDistance } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DateHelper {
  public getDistanceBetweenDates(from: Date, to: Date): string {
    return formatDistance(from, to, { addSuffix: true });
  }
}
