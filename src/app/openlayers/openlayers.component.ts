import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SimpleMapComponent } from './components/simple-map/simple-map.component';
import { LayersComponent } from './components/layers/layers.component';
import { ProjectionsComponent } from './components/projections/projections.component';
import { InteractionsComponent } from './components/interactions/interactions.component';
import { ControlsComponent } from './components/controls/controls.component';

@Component({
  selector: 'web-mapping-app-openlayers',
  standalone: true,
  imports: [CommonModule, RouterLink, SimpleMapComponent, LayersComponent, ProjectionsComponent, InteractionsComponent, ControlsComponent],
  templateUrl: './openlayers.component.html',
  styleUrl: './openlayers.component.scss',
})
export class OpenlayersComponent {}
