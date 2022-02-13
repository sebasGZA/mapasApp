import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .row{
      background-color:white;
      border-radius:5px;
      bottom:50px;
      left:50px;
      padding:10px;
      position:fixed;
      z-index:999;
      width:400px;
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {
  mapa!: mapboxgl.Map
  zoomLevel: number = 10
  @ViewChild('mapa') divMapa!: ElementRef

  constructor() {
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-75.567, 6.217], // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    this.mapa.on('zoom', () => {
      const zoom = this.mapa.getZoom()
      this.zoomLevel = zoom
    })

    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    })
  }

  zoomOut() {
    this.mapa.zoomOut()
    this.zoomLevel = this.mapa.getZoom()
  }

  zoomIn() {
    this.mapa.zoomIn()
    this.zoomLevel = this.mapa.getZoom()
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(parseInt(valor))
  }

}
