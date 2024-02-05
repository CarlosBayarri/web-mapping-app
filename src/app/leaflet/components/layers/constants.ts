
type GeometryTypes = 'Point' | 'LineString' | 'MultiLineString' | 'MultiPoint' | 'MultiPolygon' | 'Polygon' | 'GeometryCollection' | 'Circle';
export const styles = {
  'Point': {
    radius: 5,
    fillColor: "red",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  },
  'LineString': {
    "color": "green",
    "weight": 1,
    "opacity": 0.65
  },
  'MultiLineString': {
    "color": "green",
    "weight": 1,
    "opacity": 0.65
  },
  'MultiPoint': {
    radius: 5,
    fillColor: "red",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  },
  'MultiPolygon':
{
  "color": "yellow",
  "weight": 1,
  "fillColor": "rgba(255, 255, 0, 0.1)",
  "opacity": 0.65
},
  'Polygon':

{
  "color": "blue",
  "weight": 2,
  "fillColor": "rgba(0, 0, 255, 0.1",
  "opacity": 0.65
},
  'GeometryCollection':
    {
      "color": "magenta",
      "weight": 2,
      "fillColor": "magenta",
      "opacity": 0.65,
      radius: 5,
      fillOpacity: 0.8
    },
  'Circle': {}
};

export const styleFunction = function (feature: { geometry: { type: string; }; }) {
  return styles[feature.geometry.type as GeometryTypes];
};

export const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857',
    },
  },
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [0, 0],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [[4e6, -2e6], [8e6, 2e6]],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [4e6, 2e6],
          [8e6, -2e6],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [-5e6, -1e6],
            [-3e6, -1e6],
            [-4e6, 1e6],
            [-5e6, -1e6],
          ],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'MultiLineString',
        'coordinates': [
          [
            [-1e6, -7.5e5],
            [-1e6, 7.5e5],
          ],
          [
            [1e6, -7.5e5],
            [1e6, 7.5e5],
          ],
          [
            [-7.5e5, -1e6],
            [7.5e5, -1e6],
          ],
          [
            [-7.5e5, 1e6],
            [7.5e5, 1e6],
          ],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'MultiPolygon',
        'coordinates': [
          [
            [
              [-5e6, 6e6],
              [-3e6, 6e6],
              [-3e6, 8e6],
              [-5e6, 8e6],
              [-5e6, 6e6],
            ],
          ],
          [
            [
              [-2e6, 6e6],
              [0, 6e6],
              [0, 8e6],
              [-2e6, 8e6],
              [-2e6, 6e6],
            ],
          ],
          [
            [
              [1e6, 6e6],
              [3e6, 6e6],
              [3e6, 8e6],
              [1e6, 8e6],
              [1e6, 6e6],
            ],
          ],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'GeometryCollection',
        'geometries': [
          {
            'type': 'LineString',
            'coordinates': [
              [-5e6, -5e6],
              [0, -5e6],
            ],
          },
          {
            'type': 'Point',
            'coordinates': [4e6, -5e6],
          },
          {
            'type': 'Polygon',
            'coordinates': [
              [
                [1e6, -6e6],
                [3e6, -6e6],
                [2e6, -4e6],
                [1e6, -6e6],
              ],
            ],
          },
        ],
      },
    },
  ],
};
