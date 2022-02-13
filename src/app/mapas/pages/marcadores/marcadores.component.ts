import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  mapa!: mapboxgl.Map
  zoomLevel: number = 15
  center: [number, number] = [-75.567, 6.217]
  @ViewChild('mapa') divMapa!: ElementRef
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    // const markerHtml: HTMLElement = document.createElement('div')
    // markerHtml.innerHTML = 'Hola Mundo'

    new mapboxgl.Marker(
      // {
        // element: markerHtml
      // }
    )
      .setLngLat(this.center)
      .addTo(this.mapa)
  }

}
