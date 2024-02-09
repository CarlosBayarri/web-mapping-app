import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { FullScreen, defaults as defaultControls, OverviewMap } from 'ol/control';
import { GeolocationControl } from './geolocation';
import 'leaflet.fullscreen';
import 'leaflet.locatecontrol';
import 'leaflet-minimap';
declare let L: any;

@Component({
  selector: 'web-mapping-app-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent  implements OnInit {
  ngOnInit(): void {
    const map = L.map('map5', {
      fullscreenControl: true,
    }).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Añade controles de zoom
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Añade control de geolocalización
    L.control.locate().addTo(map);

    // Añade control de minimapa
    const osm2 = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 0, maxZoom: 13});
    const miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);

  }
}

