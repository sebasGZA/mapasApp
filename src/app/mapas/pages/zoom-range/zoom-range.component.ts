import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  mapa!: mapboxgl.Map
  zoomLevel: number = 10
  center: [number, number] = [-75.567, 6.217]
  @ViewChild('mapa') divMapa!: ElementRef

  constructor() {
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
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

    this.mapa.on('move', (event) => {
      const target = event.target
      const { lng, lat } = target.getCenter()
      this.center = [lng, lat]
    })
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { })
    this.mapa.off('zoomend', () => { })
    this.mapa.off('move', () => { })
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
