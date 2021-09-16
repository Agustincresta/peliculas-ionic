import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas : PeliculaDetalle [] = [];

  private _storage: Storage | null = null;

  constructor(private storage: Storage,
              private toastController: ToastController) {
                this.cargarPeliculas();
              }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: "top"
    });
    toast.present();
  }


  async guardarPelicula(pelicula : PeliculaDetalle){

    const existe = this.peliculas.find(noti => noti.title === pelicula.title);
    let mensaje = '';

    if (!existe) {
 
      this.peliculas.unshift(pelicula);
      
      this._storage.set('favoritos', this.peliculas);
      mensaje = 'Agregado a favoritos'
      

    }else{
      this.peliculas = this.peliculas.filter( noti => noti.title != pelicula.title);

      this._storage.set('favoritos', this.peliculas);
      mensaje = 'Removido de favoritos'
    }

    this.presentToast(mensaje);

    return !existe;

    /*let existe = false;
    let mensaje = '';

    


    for(const peli of this.peliculas){
      if (peli.id == pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id);
      mensaje = 'removido de favoritos'
    }else{
      
      this.peliculas.push( pelicula );
      mensaje = 'agregado a favoritos'
    }


    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);*/
  }

  async cargarPeliculas() {
    let storageData = await this.storage.create();
    this._storage = storageData;
    const favoritos = await this._storage.get('favoritos');
 
    if (favoritos) {
 
      this.peliculas = favoritos;
 
    }
    return this.peliculas;
  } 

  async existePelicula( id ) {
    await this.cargarPeliculas();
    const existe =  this.peliculas.find( peli => peli.id === id );

    return (existe)? true : false;
  }
}
