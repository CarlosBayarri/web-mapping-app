import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { FullScreen, defaults as defaultControls, OverviewMap } from 'ol/control';
import { GeolocationControl } from './geolocation';

@Component({
  selector: 'web-mapping-app-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent  implements OnInit {
  ngOnInit(): void {
    const source = new OSM();
    new Map({
      layers: [
        new TileLayer({
          source
        }),
      ],
      controls: defaultControls().extend([new FullScreen(), new GeolocationControl(), new OverviewMap({
        collapsed: false,
        layers: [
          new TileLayer({
            source
          }),
        ],
      })]),
      target: 'map5',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:4326',
      }),
    });
  }
}

