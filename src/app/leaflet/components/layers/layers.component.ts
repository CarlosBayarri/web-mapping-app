import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { geojsonObject } from './constants';
import L, { circle, geoJSON, map, tileLayer } from 'leaflet';
import { CENTER, ZOOM } from '../../../app.constants';

@Component({
  selector: 'web-mapping-app-layers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layers.component.html',
  styleUrl: './layers.component.scss',
})
export class LayersComponent  implements OnInit {
  ngOnInit(): void {
    const mapL = map('map3', {
      center: CENTER,
      zoom: ZOOM,
    });
    const tiles = tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      zIndex:0,
      attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });
    tiles.addTo(mapL);
    const geojsonLayer = geoJSON(geojsonObject as any);
    geojsonLayer.addTo(mapL);

    const circleL = circle([5e6, 7e6], { radius: 1e6 });
    circleL.addTo(mapL);
  }
}

