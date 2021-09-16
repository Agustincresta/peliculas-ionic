import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { Genre } from 'src/app/interfaces/interfaces';

const url = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string){

    query = url + query;

    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    
    return this.http.get<T>(query);
  }

  getPopulares(){

    this.popularesPage++

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage}`;
    
    return this.ejecutarQuery<RespuestaMDB>(query)
  }

  getFeature(){

    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth()+1;

    let mesString;

    if (mes < 10) {
      mesString = '0'+ mes;
    }else{
      mesString = mes
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const final = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ final }`)
  }

  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  buscarPeliculas(tituloBuscado: string){
    return this.ejecutarQuery(`/search/movie?query=${ tituloBuscado }`)
  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise( resolve => {

      this.ejecutarQuery(`/genre/movie/list?a=1`)
      .subscribe( resp => {
        this.generos = resp['genres'];
        
        resolve(this.generos)
      });

    });


  }
}
