import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import TileLayer from 'ol/layer/Tile';
import { View, Map } from 'ol';
import { OSM, WMTS } from 'ol/source';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
proj4.defs(
  'EPSG:25830',
  '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs +type=crs'
);

register(proj4);
export const EXTENT_TILE_GRID = [
  227071.8572857892140746, 3901877.0, 782591.8572857892140746, 8955317.0,
];

export const RESOLUTIONS_TILE_GRID = [
  17920, 7168, 3584, 1792, 1075.2, 716.8, 358.4, 143.36, 71.68, 35.84, 17.92,
  7.168, 3.584,
].map((x, i) => x / 256);

export const ORIGINS_TILE_GRID = [
  [227071.8572857892, 8955317.0],
  [227071.8572857892, 8948149.0],
  [227071.8572857892, 8944565.0],
  [227071.8572857892, 8942773.0],
  [227071.8572857892, 8942414.0],
  [227071.8572857892, 8942414.0],
  [227071.8572857892, 8942414.0],
  [227071.8572857892, 8942271.0],
  [227071.8572857892, 8942199.0],
  [227071.8572857892, 8942199.0],
  [227071.8572857892, 8942181.0],
  [227071.8572857892, 8942171.0],
  [227071.8572857892, 8942167.0],
];
@Component({
  selector: 'web-mapping-app-wmts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './WMTS.component.html',
  styleUrl: './WMTS.component.scss',
})
export class WMTSComponent implements OnInit {
  ngOnInit(): void {
    const matrixIds = new Array(13);
    for (let z = 0; z < 13; ++z) {
      matrixIds[z] = 'EPSG:25830:' + z;
    }
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          opacity: 0.7,
          minZoom: 9,
          source: new WMTS({
            url: 'https://guiaurbana.alicante.es/geoserver/publico/gwc/service/wmts',
            layer: 'publico:Orto2021',
            matrixSet: 'EPSG:25830',
            format: 'image/png',
            version: '1.1.1',
            projection: 'EPSG:25830',
            tileGrid: new WMTSTileGrid({
              extent: EXTENT_TILE_GRID,
              origins: ORIGINS_TILE_GRID,
              resolutions: RESOLUTIONS_TILE_GRID,
              tileSize: 256,
              matrixIds,
            }),
            style: 'raster',
            wrapX: true,
          }),
        }),
      ],
      target: 'map6',
      view: new View({
        projection: 'EPSG:25830',
        center: [720000, 4248000],
        zoom: 13,
      }),
    });
  }
}
