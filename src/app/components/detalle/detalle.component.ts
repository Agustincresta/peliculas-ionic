import { createHostListener } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  ocultar = 150;
  estrella = "star-outline"
  actores: Cast[] = [];

  slideOptActores = {
    slidesPerView:3.3,
    freeMode: true,
    spaceBetween: -5,
  };
  constructor( private moviesService: MoviesService,
               private modalController: ModalController,
               private dataLocalService: DataLocalService,) { }

  ngOnInit() {
    
    this.dataLocalService.existePelicula( this.id )
      .then(existe => this.estrella = ( existe ) ? 'star' : 'star-outline');
    

    this.moviesService.getPeliculaDetalle(this.id).subscribe(
      resp => {
        this.pelicula = resp;
      }
    );

    this.moviesService.getActoresPelicula(this.id).subscribe(
      resp => {
        this.actores = resp.cast
      }
    );
  }

  regresar(){
    this.modalController.dismiss()
  }

  favorito(){
    this.dataLocalService.guardarPelicula(this.pelicula)
    .then(existe => this.estrella = ( existe ) ? 'star' : 'star-outline');
  }



}
