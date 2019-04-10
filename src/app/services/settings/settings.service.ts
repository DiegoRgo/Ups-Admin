import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable()
export class SettingsService {

ajustes: Ajustes = {
  themeUrl: 'assets/css/colors/default.css',
  tema: 'default'
};


  constructor(@Inject( DOCUMENT ) private _document) { this.loadAjustes(); }

              saveAjustes() {
                localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
              }

              loadAjustes() {
                if ( localStorage.getItem('ajustes')) {
                  this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
                  this.applyTema( this.ajustes.tema );
                }else {
                  this.applyTema( this.ajustes.tema );
                }
              }

              applyTema( tema: string ) {
                const path = `assets/css/colors/${tema}.css`;
                this._document.getElementById('tema').setAttribute('href', path );
                this.ajustes.tema = tema;
                this.ajustes.themeUrl = path;
                this.saveAjustes();
              }

}

              interface Ajustes {
                themeUrl: string;
                tema: string;
              }
