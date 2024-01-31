import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, tileLayer } from 'leaflet';
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
    const mapL = map('map1', {
      center: CENTER,
      zoom: ZOOM,
    });

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(mapL);
  }
}
