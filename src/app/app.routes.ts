import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./nx-welcome.component').then((m) => m.NxWelcomeComponent),
  },
  {
    path: 'openlayers',
    loadComponent: () => import('./openlayers/openlayers.component').then((m) => m.OpenlayersComponent),
  },
  {
    path: 'leaflet',
    loadComponent: () => import('./leaflet/leaflet.component').then((m) => m.LeafletComponent),
  },
  {
    path: 'mapbox',
    loadComponent: () => import('./mapbox/mapbox.component').then((m) => m.MapboxComponent),
  },
  {
    path: 'google',
    loadComponent: () => import('./google/google.component').then((m) => m.GoogleComponent),
  }
];
