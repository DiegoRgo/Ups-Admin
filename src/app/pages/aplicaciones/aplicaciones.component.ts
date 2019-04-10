import { Component, OnInit } from '@angular/core';
import { Aplicacion } from '../../models/aplicacion.model';
import { AplicacionService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert';



@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styles: []
})

export class AplicacionesComponent implements OnInit {

  aplicaciones: Aplicacion[] = [];

  constructor( public _aplicacionService: AplicacionService,
               public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarAplicaciones();
    this._modalUploadService.notificacion
          .subscribe( () => this.cargarAplicaciones());
  }

  buscarAplicacion( termino: string ) {
    if ( termino.length <= 0 ) {
        this.cargarAplicaciones();
        return;
    }
    this._aplicacionService.buscarAplicaciones( termino)
          .subscribe( aplicaciones => this.aplicaciones = aplicaciones );
  }

  cargarAplicaciones() {
    this._aplicacionService.cargarAplicaciones()
          .subscribe( aplicaciones => {
              this.aplicaciones = aplicaciones;
          });
  }

  guardarAplicacion( aplicacion: Aplicacion ) {
      this._aplicacionService.actualizarAplicaciones( aplicacion )
            .subscribe();
  }

  borrarAplicacion( aplicacion: Aplicacion ) {
      swal({
        title: 'Esta seguro?',
        text: 'Esta a punto de eliminar la aplicacion: ' + aplicacion.nombre,
        icon: 'warning',
        dangerMode: true,
      })
      .then( borrar => {
        console.log(borrar);
        if (borrar) {
            this._aplicacionService.eliminarAplicacion( aplicacion._id )
                      .subscribe( borrado =>  {
                        console.log( borrado);
                        this.cargarAplicaciones();
                      });
        }
      });
  }

  actualizarImg( aplicacion: Aplicacion ) {
        this._modalUploadService.mostarModal( 'aplicaciones', aplicacion._id );
  }


}
