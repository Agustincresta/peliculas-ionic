import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

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
  
  constructor(private modalController: ModalController) {

   }

  ngOnInit() {

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
