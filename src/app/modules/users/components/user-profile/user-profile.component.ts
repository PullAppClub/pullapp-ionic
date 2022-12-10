import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../../../../environments/environment';
import { CreateMapArgs } from '@capacitor/google-maps/dist/typings/implementation';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor() {}

  async ngOnInit() {
    const apiKey = environment.mapsKey;
    const mapElement = document.getElementById('map');
    const mapConfig = {
      center: {
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 8,
      disableDefaultUI: true,
      androidLiteMode: false,
    };
    const mapOptions = {
      id: 'map',
      apiKey: apiKey,
      config: mapConfig,
      element: mapElement,
    };

    // Create the Map Element
    const map = await GoogleMap.create(mapOptions as CreateMapArgs);

    // Drop a Map Marker
    await map.addMarkers([
      {
        coordinate: {
          lat: 33.6,
          lng: -117.9,
        },
        title: 'Hello world',
      },
    ]);
  }
}
