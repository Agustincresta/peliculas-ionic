import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  number = this.verNumero();

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts =  {
    slidesPerView: 1,
    freeMode: true,
    autoplay: true,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 4,
      },
      // when window width is >= 640px
      600: {
        slidesPerView: 5,
      },
      850: {
        slidesPerView: 7,
      },
      1080: {
        slidesPerView: 8,
        
      }

    }
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }

  verNumero(){
    if (innerWidth > 1080) {
      return  8.0
    }else if (innerWidth > 850) {
      return 7.0
    }else if (innerWidth > 600) {
      return 5.0
    }else if (innerWidth > 480) {
      return 4.0
    }else{
      return 3.0
    }
  }

  onClick(){
    this.cargarMas.emit();
  }

  async verDetalle(id){
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    
    modal.present();

  }

}
