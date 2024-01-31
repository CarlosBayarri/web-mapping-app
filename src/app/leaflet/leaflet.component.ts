import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './components/controls/controls.component';
import { InteractionsComponent } from './components/interactions/interactions.component';
import { LayersComponent } from './components/layers/layers.component';
import { ProjectionsComponent } from './components/projections/projections.component';
import { SimpleMapComponent } from './components/simple-map/simple-map.component';

@Component({
  selector: 'web-mapping-app-leaflet',
  standalone: true,
  imports: [CommonModule, ControlsComponent, InteractionsComponent, LayersComponent, ProjectionsComponent, SimpleMapComponent],
  templateUrl: './leaflet.component.html',
  styleUrl: './leaflet.component.scss',
})
export class LeafletComponent {}
