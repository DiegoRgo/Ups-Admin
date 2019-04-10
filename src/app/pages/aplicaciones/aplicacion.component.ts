import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AplicacionService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Aplicacion } from '../../models/aplicacion.model';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styles: []
})
export class AplicacionComponent implements OnInit {

  forma: FormGroup;

  constructor(
          public _aplicacionService: AplicacionService,
          public router: Router
  ) { }

  ngOnInit() {

    this.forma = new FormGroup ({
      nombre: new FormControl( null, Validators.required ),
      url: new FormControl( null, Validators.required )
    });
  }

  crearAplicacion() {
      if ( this.forma.value.nombre === null ) {
           swal('Error al crear la aplicacion', 'El nombre es necesario', 'warning');
           return;
         }

       if ( this.forma.value.url === null ) {
         swal('Error al crear la aplicacion', 'La url es necesaria', 'warning');
       }

       const aplicacion = new Aplicacion(
       this.forma.value.nombre,
       this.forma.value.url
     );

     if ( this.forma.valid ) {
        this._aplicacionService.crearAplicacion(aplicacion)
                      .subscribe( resp => this.router.navigate(['/aplicaciones']) );
                     // visualiza en consola los datos enviados
                //   .subscribe( resp => {
                //     console.log(resp);
                //  });
     }
  }
}
