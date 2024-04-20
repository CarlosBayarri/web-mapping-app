import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleMapComponent } from './components/simple-map/simple-map.component';


@Component({
  selector: 'web-mapping-app-google',
  standalone: true,
  imports: [CommonModule, SimpleMapComponent],
  templateUrl: './google.component.html',
  styleUrl: './google.component.scss',
})
export class GoogleComponent {}
