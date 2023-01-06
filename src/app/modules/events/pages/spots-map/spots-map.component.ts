import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spots-map',
  templateUrl: './spots-map.component.html',
  styleUrls: ['./spots-map.component.scss'],
})
export class SpotsMapComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('reloaded');
  }
}
