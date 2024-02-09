import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import { country, selectedCountry } from './constants';
import { DblClickDragZoom, defaults as defaultInteractions} from 'ol/interaction';
import L from 'leaflet';
import { styles } from '../layers/constants';



@Component({
  selector: 'web-mapping-app-interactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.scss',
})
export class InteractionsComponent  implements OnInit {
  ngOnInit(): void {
    // Create a Leaflet map
    const map = L.map('map4').setView([0, 0], 2);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Create a GeoJSON layer and add it to the map
    const geojsonLayer = L.geoJSON(undefined, {
      style: function(feature) {
        return styles[feature?.geometry.type as 'Polygon' | 'MultiPolygon' | 'LineString' | 'Point' | 'MultiPoint' | 'MultiLineString' | 'GeometryCollection' | 'Circle'];
      }
    }).addTo(map);

    // Fetch GeoJSON data and add it to the GeoJSON layer
    fetch('https://gist.githubusercontent.com/ThomasG77/c38e6b0ecfd014342aad/raw/ecaa086688859566f108b9630047a7110ad6eb94/countries.geojson')
      .then(response => response.json())
      .then(data => {
        geojsonLayer.addData(data);
      });
    const selectionLayer = L.geoJSON().addTo(map);

    geojsonLayer.on('click', function(event) {
      // Obtén la característica en la que se hizo clic
      const feature = event.layer.feature;

      // Cambia el estilo de la capa de selección
      selectionLayer.setStyle({
        color: 'yellow',
        weight: 2,
        fillColor: 'rgba(255, 255, 0, 0.1)',
        opacity: 0.65
      });

      // Añade la característica seleccionada a la capa de selección
      selectionLayer.addData(feature);
    });
  }

}

