import { Component, OnInit } from '@angular/core';
import { UsuarioService, InfoAppService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: any;

  constructor( public _usuarioService: UsuarioService,
               public _servicioInfop: InfoAppService) {

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }


  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._usuarioService.actualizarUsuario( this.usuario )
                  .subscribe();
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
        swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
        this.imagenSubir = null;
        return;
    }
      this.imagenSubir = archivo;

      const reader = new FileReader();
      const urlImgTemp = reader.readAsDataURL( archivo );

      reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}