import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string,
  marker: mapboxgl.Marker
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .list-group{
      position:fixed;
      top:20px;
      right:20px;
      z-index: 99;
    }

    li{
      cursor:pointer
    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  mapa!: mapboxgl.Map
  zoomLevel: number = 15
  center: [number, number] = [-75.567, 6.217]
  @ViewChild('mapa') divMapa!: ElementRef

  //Arreglo de marcadores
  marcadores: MarcadorColor[] = []
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

    // new mapboxgl.Marker(
    //   // {
    //     // element: markerHtml
    //   // }
    // )
    //   .setLngLat(this.center)
    //   .addTo(this.mapa)


  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      color,
      draggable: true
    })
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.marcadores.push({
      color: color,
      marker: nuevoMarcador
    })
  }

  irMarcador(marcador: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage(){

  }

  leerLocalStorage(){
    
  }

}
