import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-mapping-app-mapbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.scss',
})
export class MapboxComponent {}
