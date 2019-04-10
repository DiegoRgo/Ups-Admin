import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  changeColor( theme: string, tema: any  ) {
    this.applytheme( tema );
    this._ajustes.applyTema( theme );
  }

  applytheme( tema: any) {
  const selectores: any = document.getElementsByClassName('selector');

  for ( const ref of selectores ) {
      ref.classList.remove('working');
  }
  tema.classList.add('working');
}

colocarCheck() {
  const selectores: any = document.getElementsByClassName('selector');
  const link = this._ajustes.ajustes.tema;

  for ( const ref of selectores ) {
    if ( ref.getAttribute('data-theme') === link ) {
      ref.classList.add('working');
      break;
    }
}
}

}
