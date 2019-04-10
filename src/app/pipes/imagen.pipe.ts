import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

      let url = URL_SERVICIOS + '/img';

      if (!img) {
        return url + '/usuario/noExisteImagen';
      }

      switch ( tipo ) {
        case 'usuarios' :
         url += '/usuarios/' + img;
        break;
        case 'aplicacion':
         url += '/aplicaciones/' + img;
        break;
        default:
        console.log('tipo de imagen no existe');
        url += '/usuario/noExisteImagen';
      }
    return url;
  }

}
