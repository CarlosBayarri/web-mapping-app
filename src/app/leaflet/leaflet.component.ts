import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'web-mapping-app-leaflet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaflet.component.html',
  styleUrl: './leaflet.component.scss',
})
export class LeafletComponent {}
