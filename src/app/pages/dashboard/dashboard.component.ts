import { Component, OnInit } from '@angular/core';
import { AplicacionService } from '../../services/service.index';
import { Aplicacion } from '../../models/aplicacion.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../assets/css/user-card.css']
})


export class DashboardComponent implements OnInit {

  aplicaciones: Aplicacion[] = [];
  app : Aplicacion[] = [];

  constructor( public _aplicacionService: AplicacionService ) { }

  ngOnInit() {
    this.cargarAplicaciones();
    //this.irUrl();

  }

  cargarAplicaciones() {
    this._aplicacionService.cargarAplicaciones()
          .subscribe( aplicaciones => {
              this.aplicaciones = aplicaciones;
          });
  }

  // irUrl() {

  //   this._aplicacionService.cargarAplicaciones()
  //             .subscribe( (resp: any) => {
  //             this.app = resp.aplicaciones.url;

  //              // console.log(this.app);
  //             });

  // }

}
