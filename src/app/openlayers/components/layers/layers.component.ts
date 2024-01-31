import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { BingMaps, OSM, XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { geojsonObject, styleFunction } from './constants';
import { Circle, Geometry } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
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
    const vectorSource = new VectorSource<Feature<Geometry>>({
      features: new GeoJSON().readFeatures(geojsonObject) as Feature<Geometry>[],
    });

    vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });
    const attributions =
        'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>';
    new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: attributions,
            url:
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          }),
        }),
        vectorLayer
      ],
      target: 'map3',
      view: new View({
        center: CENTER,
        zoom: ZOOM,
      }),
    });
  }
}

