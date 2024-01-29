import CircleStyle from 'ol/style/Circle';
import { Fill, Stroke, Style } from 'ol/style';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import { StyleLike } from 'ol/style/Style';
export const country = new Style({
  stroke: new Stroke({
    color: 'gray',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(20,20,20,0.9)',
  }),
});
export const selectedCountry = new Style({
  stroke: new Stroke({
    color: 'rgba(200,20,20,0.8)',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(200,20,20,0.4)',
  }),
});
