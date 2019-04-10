import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class InfoAppService {

  info: any ;
  cargada: boolean;

  constructor( private http: HttpClient ) {

    this.http.get('assets/data/data-app.json')
      .subscribe( (resp: any) => {
        this.cargada = true;
        this.info = resp;

      });
   }

}
