import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Aplicacion } from '../../models/aplicacion.model';



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  aplicaciones: Aplicacion[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activatedRoute.params
      .subscribe( params => {
        const termino = params['termino'];
        this.buscar( termino );
      });

  }

  ngOnInit() {
  }

  buscar( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
        .subscribe( (resp: any) => {
          //console.log( resp );
           this.usuarios = resp.usuario;
           this.aplicaciones = resp.aplicaciones;
        });

  }

}
