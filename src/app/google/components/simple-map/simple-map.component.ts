import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CENTER, ZOOM } from '../../../app.constants';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;

@Component({
  selector: 'web-mapping-app-simple-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-map.component.html',
  styleUrl: './simple-map.component.scss',
})
export class SimpleMapComponent implements AfterViewInit {
  @ViewChild('map1') mapElement!: ElementRef;

  ngAfterViewInit(): void {

    const mapProperties = {
      center: new google.maps.LatLng(CENTER[0], CENTER[1]),
      zoom: ZOOM,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
}
