import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-navbar',
  templateUrl: './info-navbar.component.html',
  styleUrls: ['./info-navbar.component.scss'],
})
export class InfoNavbarComponent implements OnInit {
  public showAppFlyout = false;

  constructor() {}

  ngOnInit() {}
}
