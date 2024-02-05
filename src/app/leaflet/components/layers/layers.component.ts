/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { geojsonObject, styleFunction } from './constants';
import L, { circle, geoJSON, map, tileLayer } from 'leaflet';
import { CENTER, ZOOM } from '../../../app.constants';
import { GeoJsonObject } from 'geojson';
import proj4 from 'proj4';
import { style } from '@angular/animations';

@Component({
  selector: 'web-mapping-app-layers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layers.component.html',
  styleUrl: './layers.component.scss',
})
export class LayersComponent  implements OnInit {
  ngOnInit(): void {
    const mapL = L.map('map3', {
      center: CENTER,
      zoom: ZOOM,
      crs: L.CRS.EPSG3857,
    });
    const tiles = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      zIndex:0,
      attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });
    tiles.addTo(mapL);
    const transformedGeojsonObject = this.transformCoordinates(geojsonObject as GeoJsonObject);
    const geojsonLayer = L.geoJSON(transformedGeojsonObject as GeoJsonObject, {
      style: styleFunction as any,
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        })}
    });
    geojsonLayer.addTo(mapL);
    const circleL = circle(proj4('EPSG:3857', 'EPSG:4326', [5e6, 7e6]) as any, { radius: 1e6,
      fillColor: "rgba(255,0,0,0.2)",
      color: "red",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8  });
    circleL.addTo(mapL);
  }
  transformCoordinates(geojsonObject: GeoJsonObject): GeoJsonObject {
    const transformedGeojsonObject = JSON.parse(JSON.stringify(geojsonObject));
    try {
      for (const feature of transformedGeojsonObject.features) {
        if (feature.geometry.type === 'GeometryCollection') {
          for (const geometry of feature.geometry.geometries) {
            this.transformGeometry(geometry);
          }
        } else {
          this.transformGeometry(feature.geometry);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return transformedGeojsonObject;
  }
  transformGeometry(geometry: any) {
    switch (geometry.type) {
      case 'Point':
        // eslint-disable-next-line no-case-declarations
        const transformedPoint = proj4('EPSG:3857', 'EPSG:4326', geometry.coordinates);
        geometry.coordinates[0] = transformedPoint[0];
        geometry.coordinates[1] = transformedPoint[1];
        break;
      case 'LineString':
        for (let i = 0; i < geometry.coordinates.length; i++) {
          const transformedCoordinates = proj4('EPSG:3857', 'EPSG:4326', geometry.coordinates[i]);
          geometry.coordinates[i][0] = transformedCoordinates[0];
          geometry.coordinates[i][1] = transformedCoordinates[1];
        }
        break;
      case 'MultiLineString':
        for (let j = 0; j < geometry.coordinates.length; j++) {
          for (let i = 0; i < geometry.coordinates[j].length; i++) {
            const transformedCoordinates = proj4('EPSG:3857', 'EPSG:4326', geometry.coordinates[j][i]);
            geometry.coordinates[j][i][0] = transformedCoordinates[0];
            geometry.coordinates[j][i][1] = transformedCoordinates[1];
          }
        }
        break;
      case 'Polygon':
        for (let j = 0; j < geometry.coordinates.length; j++) {
          for (let i = 0; i < geometry.coordinates[j].length; i++) {
            const transformedCoordinates = proj4('EPSG:3857', 'EPSG:4326', geometry.coordinates[j][i]);
            geometry.coordinates[j][i][0] = transformedCoordinates[0];
            geometry.coordinates[j][i][1] = transformedCoordinates[1];
          }
        }
        break;
      case 'MultiPolygon':
        for (let k = 0; k < geometry.coordinates.length; k++) {
          for (let j = 0; j < geometry.coordinates[k].length; j++) {
            for (let i = 0; i < geometry.coordinates[k][j].length; i++) {
              const transformedCoordinates = proj4('EPSG:3857', 'EPSG:4326', geometry.coordinates[k][j][i]);
              geometry.coordinates[k][j][i][0] = transformedCoordinates[0];
              geometry.coordinates[k][j][i][1] = transformedCoordinates[1];
            }
          }
        }
        break;
      default:
        console.log(`Unsupported geometry type: ${geometry.type}`);
    }
  }
}

