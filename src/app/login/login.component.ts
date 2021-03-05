import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService, InfoAppService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';



declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
  styleUrls: ['../../assets/css/loginRegister.css']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  email: string;

  constructor(  public _usuarioService: UsuarioService,
                public router: Router,
                public _servicioInfop: InfoAppService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.remember = true;
    }
  }

  ingresar( forma: NgForm ) {
    if (forma.invalid) {
          return;
    }
    const usuario = new Usuario( null, forma.value.email, forma.value.passowrd );
    this._usuarioService.login(usuario, forma.value.remember)
                    .subscribe( correcto => this.router.navigate(['/dashboard']) );
  }
}
