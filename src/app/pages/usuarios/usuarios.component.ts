import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
                public _usuarioService: UsuarioService,
                public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
              .subscribe( resp =>  this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostarModal( 'usuarios', id );
  }

  cargarUsuarios() {
    this.cargando = true;
      this._usuarioService.cargarUsuarios( this.desde )
                .subscribe( (resp: any) => {
                  this.totalRegistros = resp.total;
                  this.usuarios = resp.usuarios;
                  this.cargando = false;
                });
  }

  cambiarDesde( valor: number ) {
      const desde = this.desde + valor;
      console.log(desde);

      if ( desde >= this.totalRegistros ) {
          return;
      }

      if ( desde < 0 ) {
        return;
      }

      this.desde += valor;
      this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {

    if ( termino.length <= 0 ) {
        this.cargarUsuarios();
        return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
              .subscribe( (usuario: Usuario[]) => {
                  this.usuarios = usuario;
                  this.cargando = false;
              });

  }

  borrarUsuario( usuarios: Usuario ) {
    if (usuarios._id === this._usuarioService.usuario._id) {
      swal('No se puede eliminar el usuario', 'No se puede borrar asi mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de eliminar a ' + usuarios.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      console.log(borrar);
      if (borrar) {
          this._usuarioService.borrarUsuario( usuarios._id )
                    .subscribe( borrado =>  {
                      console.log( borrado);
                      this.cargarUsuarios();
                    });
      }
    });

  }

  guardarUsuario( usuarios: Usuario ) {
      this._usuarioService.actualizarUsuario( usuarios )
              .subscribe();
  }

}
