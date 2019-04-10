import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Aplicacion } from '../../models/aplicacion.model';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable()
export class AplicacionService {

  totalAplicaciones: number = 0;

  constructor(
      public http: HttpClient,
      public _usuarioService: UsuarioService
  ) {}


  cargarAplicaciones() {
    const url = URL_SERVICIOS + '/aplicacion';
      return this.http.get( url )
        .map( (resp: any) => {
            this.totalAplicaciones = resp.total;
            return resp.aplicaciones;
        });
  }

  obtenerAplicaciones( id: string ) {
      const url = URL_SERVICIOS + '/aplicacion/' + id;
      return this.http.get( url )
                  .map( (resp: any) => resp.aplicacion);
  }

  eliminarAplicacion( id: string) {
      let url = URL_SERVICIOS + '/aplicacion/' + id;
      url += '?token=' + this._usuarioService.token;
          return this.http.delete( url )
                      .map( resp => swal('Aplicacion eliminada', ' Eliminado correctamente', 'success') );
  }

  crearAplicacion( aplicacion: Aplicacion) {
      let url = URL_SERVICIOS + '/aplicacion';
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, aplicacion )
                  .map( (resp: any) => resp.aplicacion);
  }

  buscarAplicaciones( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/aplicaciones/' + termino;
    return this.http.get( url )
              .map(( resp: any ) => resp.aplicaciones);
  }

  actualizarAplicaciones ( aplicacion: Aplicacion ) {
      let url = URL_SERVICIOS + '/aplicacion/' + aplicacion._id;
      url += '?token=' + this._usuarioService.token;

          return this.http.put( url, aplicacion )
                      .map( (resp: any) => {
                        swal ('Aplicacion actualizada', aplicacion.nombre, 'success');
                        return resp.aplicacion;
                      });
  }


}
