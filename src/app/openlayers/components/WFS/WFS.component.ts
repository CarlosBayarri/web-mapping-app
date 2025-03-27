import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import TileLayer from 'ol/layer/Tile';
import { View, Map } from 'ol';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';

@Component({
  selector: 'web-mapping-app-wfs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './WFS.component.html',
  styleUrl: './WFS.component.scss',
})
export class WFSComponent implements OnInit {
  public areaFilterValue = '0';

  public layerNames: string[] = [];
  public service: { name: string; value: string | null; }[] = [];
  public url =
    'http://localhost:8080/geoserver/ISI/ows?version=1.0.0&SERVICE=WFS&request=GetCapabilities';
  private _map!: Map;
  ngOnInit(): void {
    this._getCapabilities();
    this._map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map7',
      view: new View({
        projection: 'EPSG:25830',
        center: [788994, 4487220],
        zoom: 10,
      }),
    });
  }

  private _addWFSLayer(layerName: string) {
    const wfsUrl = `http://localhost:8080/geoserver/ISI/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layerName}&outputFormat=application/json`;
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: (extent) => `${wfsUrl}&SRS=25830&BBOX=${extent.join(',')}`,
      strategy: bboxStrategy
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: [
        {
          filter: ['==', ['get', 'area'], this.areaFilterValue],
          style: {
            'circle-fill-color': '#00ff00',
            'circle-stroke-color': '#000000',
            'circle-radius': 5
          },
        },
        {
          filter: ['!=', ['get', 'area'], this.areaFilterValue],
          style: {
            'circle-fill-color': '#0000ff',
            'circle-stroke-color': '#000000',
            'circle-radius': 5
          },
        },
      ]
    });
    this._map.addLayer(vectorLayer);
    // Log the extent to verify the BBOX coordinates
    this._map.getView().on('change:center', () => {
      const extent = this._map.getView().calculateExtent(this._map.getSize());
      console.log('Current extent:', extent);
    });
  }
  private _getCapabilities() {
    fetch(this.url)
      .then((response) => response.text())
      .then((xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const featureTypes = xmlDoc.getElementsByTagName('FeatureType');
        const service = xmlDoc.getElementsByTagName('Service')[0];
        const children = service.children;
        for (let j = 0; j < children.length; j++) {
          this.service.push({
            name: children[j].tagName,
            value: children[j].textContent,
          });
        }
        this.layerNames = [];
        for (let i = 0; i < featureTypes.length; i++) {
          const nameElement = featureTypes[i].getElementsByTagName('Name')[0];
          if (nameElement && nameElement.textContent) {
            const layerName = nameElement.textContent;
            this.layerNames.push(layerName);
            this._addWFSLayer(layerName);
          }
        }
      })
      .catch((error) => console.error('Error al obtener Capabilities:', error));
  }
}
