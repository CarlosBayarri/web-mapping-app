import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import TileLayer from 'ol/layer/Tile';
import { View, Map } from 'ol';
import { OSM } from 'ol/source';
import { CENTER, ZOOM } from '../../../app.constants';

@Component({
  selector: 'web-mapping-app-simple-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-map.component.html',
  styleUrl: './simple-map.component.scss',
})
export class SimpleMapComponent implements OnInit {
  ngOnInit(): void {
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map1',
      view: new View({
        center: CENTER,
        zoom: ZOOM,
      }),
    });
  }
}
