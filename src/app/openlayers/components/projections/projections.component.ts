import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
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
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map2',
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:25830'
      }),
    });
  }
}

