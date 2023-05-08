import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { GoogleMap } from '@capacitor/google-maps';
import { CreateMapArgs } from '@capacitor/google-maps/dist/typings/implementation';
import { styleConfig } from '../../../../../assets/g-maps.config';
import TileLayer from 'ol/layer/Tile';
import { View } from 'ol';
import { OSM, XYZ } from 'ol/source';
import Map from 'ol/Map';
import { Style } from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input()
  public style!: { [klass: string]: any };

  @Input()
  public mapDivId!: string;

  @ViewChild('map', { static: true })
  public myNameElem!: ElementRef;

  constructor() {}

  async ngAfterViewInit() {
    const apiKey = environment.mapsKey;
    const mapElement = this.myNameElem.nativeElement;

    const mapConfig = {
      center: {
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 12,
      disableDefaultUI: true,
      androidLiteMode: false,
      styles: styleConfig,
    };
    const mapOptions = {
      id: this.mapDivId,
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
    // OpenLayers OpenStreetMap
    // new Map({
    //   target: 'map',
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //   ],
    //   view: new View({
    //     center: [915046, 7008963],
    //     zoom: 13,
    //     projection: 'EPSG:3857',
    //   }),
    // });
  }
}
