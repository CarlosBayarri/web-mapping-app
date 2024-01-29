import { Observable, Subject } from 'rxjs';

import { Feature, Geolocation, Map } from 'ol';
import { Control } from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import VectorLayer from 'ol/layer/Vector';
import { Options } from 'ol/control/Control';

export class GeolocationControl extends Control {
  public error$: Observable<string>;
  public tracked$: Observable<boolean>;
  public location$: Observable<Record<string, Coordinate | undefined>>;

  private geolocation: Geolocation;
  private layer: VectorLayer<VectorSource<Feature<Geometry>>> | undefined;
  private enabled: boolean = false;
  private _error$ = new Subject<string>();
  private _tracked$ = new Subject<boolean>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _location$ = new Subject<Record<string, any>>();
  constructor(options?: Options) {
    const button = document.createElement('button');
    button.innerHTML = '📍';

    const element = document.createElement('div');
    element.className = 'ol-geolocation-control ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element,
      target: options?.target,
    });
    button.addEventListener('click', this.track.bind(this), false);

    this.error$ = this._error$.asObservable();
    this.tracked$ = this._tracked$.asObservable();
    this.location$ = this._location$.asObservable();

    const geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.getMap()?.getView().getProjection(),
    });
    this.geolocation = geolocation;

    const accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(
        geolocation.getAccuracyGeometry() as Geometry
      );
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
    geolocation.on('error', (error) => {
      this._error$.next(error.message);
    });
    geolocation.on('change:position', () => {
      this._location$.next({
        position: geolocation.getPosition(),
        projection: geolocation.getProjection(),
      });
      this._tracked$.next(true);
      const coordinates = geolocation.getPosition();
      if (coordinates) {
        const point = new Point(coordinates) as Geometry;
        positionFeature.setGeometry(coordinates ? point : undefined);
      }
      if (!this.element.classList.contains('active')) {
        this.getMap()?.getView().fit(this.layer?.getSource()?.getExtent() || [], {
          duration: 500,
          maxZoom: 20,
        });
        console.log(positionFeature, this.layer)
      }
      this.element.classList.add('active');
    });
    // Delay avoid error
    setTimeout(() => {
      this.layer = new VectorLayer({
        map: this.getMap() as Map,
        source: new VectorSource({
          features: [accuracyFeature, positionFeature],
        }),
        zIndex: 9999,
      });
    })

  }

  /**
   * Comienza a recoger la ubicación
   */
  track(): void {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this._tracked$.next(false);
    }
    this.geolocation.setTracking(this.enabled);
  }
}
