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



@Component({
  selector: 'web-mapping-app-interactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.scss',
})
export class InteractionsComponent  implements OnInit {
  ngOnInit(): void {
    // lookup for selection objects
    let selection: Record<string, any> = {};
    const vtLayer = new VectorTileLayer({
      declutter: true,
      source: new VectorTileSource({
        maxZoom: 15,
        format: new MVT({
          idProperty: 'iso_a3',
        }),
        url:
          'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
          'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
      }),
      style: country,
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vtLayer
      ],
      interactions: defaultInteractions().extend([new DblClickDragZoom()]),
      target: 'map4',
      view: new View({
        center: [0, 0],
        zoom: 2,
        multiWorld: true,
      }),
    });

    const selectionLayer = new VectorTileLayer({
      map: map,
      renderMode: 'hybrid',
      source: vtLayer.getSource() as VectorTileSource,
      style: function (feature) {
        if (feature && feature.getId()) {
          const id = feature.getId();
          if (id && id in selection) {
            return selectedCountry;
          }
          return;
        }
        return;
      },
    });

    map.on(['click', 'pointermove'], function (event) {
      if (event.type === 'pointermove') {
        return;
      }
      vtLayer.getFeatures((event as any).pixel).then(function (features) {
        if (!features.length) {
          selection = {};
          selectionLayer.changed();
          return;
        }
        const feature = features[0];
        if (!feature) {
          return;
        }
        const fid = feature.getId() as number;

          selection = {};
        // add selected feature to lookup
        selection[fid] = feature;

        selectionLayer.changed();
      });
    })
  }
}

