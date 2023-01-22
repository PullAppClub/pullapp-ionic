import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabBarService {
  public showTabBar: boolean = true;

  public setShowTabBar(value: boolean): void {
    this.showTabBar = value;
  }
}
