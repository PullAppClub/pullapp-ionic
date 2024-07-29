import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-navbar',
  templateUrl: './info-navbar.component.html',
  styleUrls: ['./info-navbar.component.scss'],
})
export class InfoNavbarComponent implements OnInit {
  public showAppFlyout = false;
  public showMuscleFlyout = false;
  public showBusinessFlyout = false;
  public showCompanyFlyout = false;

  constructor() {}

  public ngOnInit() {}

  public toggleAppFlyout(): void {
    this.showAppFlyout = true;

    this.showMuscleFlyout = false;
    this.showBusinessFlyout = false;
    this.showCompanyFlyout = false;
  }

  public toggleMuscleFlyout(): void {
    this.showMuscleFlyout = true;

    this.showAppFlyout = false;
    this.showBusinessFlyout = false;
    this.showCompanyFlyout = false;
  }

  public toggleBusinessFlyout(): void {
    this.showBusinessFlyout = true;

    this.showAppFlyout = false;
    this.showMuscleFlyout = false;
    this.showCompanyFlyout = false;
  }

  public toggleCompanyFlyout(): void {
    this.showCompanyFlyout = true;

    this.showAppFlyout = false;
    this.showMuscleFlyout = false;
    this.showBusinessFlyout = false;
  }
}
