import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService, InfoAppService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/loginRegister.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioServicio: UsuarioService,
    public _servicioInfop: InfoAppService,
    public router: Router
  ) { }

  validacionPassword( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2) {
          return null;
      }
      return {
                validacionPassword: true
      };

    };

  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      passwordC: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ),
    }, { validators: this.validacionPassword( 'password', 'passwordC' ) } );
  }

  registarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal('Importante', 'Debe aceptar las condiciones de Uso', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
     );

     this._usuarioServicio.crearUsuario( usuario )
           .subscribe( resp => this.router.navigate(['/login']));
  }

}
