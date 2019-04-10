import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirImgService } from '../uploadImg/subir-img.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import swal from 'sweetalert';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( public http: HttpClient,
               public router: Router,
               public _subirImgService: SubirImgService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevaToken';
    url += '?token=' + this.token;

    return this.http.get( url )
                .map( (resp: any) => {
                      this.token = resp.token;
                      localStorage.setItem( 'token', this.token );
                      return true;
                })
                .catch( err => {
                  this.router.navigate(['/login']);
                  swal( 'Error al renovar token', 'No se pudo renovar el token', 'error' );
                  return Observable.throw( err );
                });
  }

  estaLogueado() {
      return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse( localStorage.getItem('usuario'));
        this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  logOut() {
      this.usuario = null;
      this.token = '';
      this.menu = [];

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('menu');

      this.router.navigate(['/login']);
  }


  guardarStorage(  id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id' , id);
    localStorage.setItem('token' , token);
    localStorage.setItem('usuario' , JSON.stringify(usuario));
    localStorage.setItem('menu' , JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  login( usuario: Usuario, remember: boolean = false ) {

      if ( remember ) {
                        localStorage.setItem('email', usuario.email);
      }else {
                        localStorage.removeItem('email');
      }


    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                                          .map( (resp: any) => {
                                            this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu );
                                            return true;
                                          })
                                          .catch( err => {
                                            swal( 'Error al Loguearse', err.error.message, 'error' );
                                            return Observable.throw( err );
                                          });
  }

  crearUsuario( usuario: Usuario ) {
      const url = URL_SERVICIOS + '/usuario';

      return this.http.post( url, usuario ).map( (resp: any) => {
      swal('Usuario Creado', usuario.email, 'success');
      return resp.usuario;
    })
    .catch( err => {
      swal( err.error.mensaje, err.error.errors.message, 'error' );
      return Observable.throw( err );
    });
  }

  actualizarUsuario( usuario: Usuario ) {
      const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

     return this.http.put( url, usuario )
                   .map( (resp: any) => {

                    if (usuario._id === this.usuario._id) {
                      const usuarioDB: Usuario = resp.usuario;
                     this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
                    }
                     swal('Usuario Actualizado Correctamente', usuario.nombre, 'success');

                     return true;
                   });
  }


  cambiarImagen( archivo: File, id: string ) {
      this._subirImgService.subirArchivo( archivo, 'usuarios', id )
                .then( (resp: any) => {
                  this.usuario.img = resp.usuario.img;
                  swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
                  this.guardarStorage( id, this.token, this.usuario, this.menu );
                })
                .catch( resp => {
                  console.log( resp );
                });
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
      const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
      return this.http.get( url )
                .map(( resp: any ) => resp.usuario);
  }

  borrarUsuario( id: string ) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete( url )
    .map( resp =>  {
      swal('Usuario Eliminado', 'El usuario a sido eliminado correcatamente!', 'success');
      return true;
    });

  }

}
