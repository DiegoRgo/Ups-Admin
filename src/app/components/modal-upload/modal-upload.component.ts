import { Component, OnInit } from '@angular/core';
import { SubirImgService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor( public _subirImgService: SubirImgService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
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

  subirImagen () {
    this._subirImgService.subirArchivo( this.imagenSubir , this._modalUploadService.tipo, this._modalUploadService.id )
    .then( resp => {
      console.log(resp);
        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
    })
    .catch( err => {
console.log('erorr en la carga');
    });
  }


}
