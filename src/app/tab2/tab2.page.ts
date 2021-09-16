import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = "";
  peliculas : Pelicula [] = [];
  loading = false;

  ideas: string[] = ['Spiderman','Avengers', 'El señor de los anillos', 'Tron']
  constructor(private moviesService: MoviesService,
              private modalController: ModalController) {}

  buscar( event ){
    this.loading = true;
  
    const valor = event.detail.value;

    if (valor.length === 0) {
      this.loading = false;
      this.peliculas = [];
      return;
    }


    this.moviesService.buscarPeliculas(valor).subscribe(
      resp => {
        this.peliculas = resp['results']
        this.loading = false;
      })
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
