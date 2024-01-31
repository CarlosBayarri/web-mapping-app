import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CENTER, ZOOM } from '../../../app.constants';
import L, { Projection, map, tileLayer, CRS } from 'leaflet';
import 'proj4leaflet';
import proj4 from 'proj4';

import { register } from 'ol/proj/proj4';
proj4.defs(
  'EPSG:25830',
  '+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);
register(proj4);

@Component({
  selector: 'web-mapping-app-projections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projections.component.html',
  styleUrl: './projections.component.scss',
})
export class ProjectionsComponent  implements OnInit {
  ngOnInit(): void {
    const crs = new (L as any).Proj.CRS('EPSG:25830', proj4.defs('EPSG:25830'), {
      origin: [-400, 4000],
      resolutions: [
        8192, 4096, 2048, 1024, 512, 256, 128
      ]
    });
    const mapL = map('map2', {
      center: CENTER,
      crs: crs,
      worldCopyJump: false,
      zoom: ZOOM
    });
    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(mapL);

  }
}

