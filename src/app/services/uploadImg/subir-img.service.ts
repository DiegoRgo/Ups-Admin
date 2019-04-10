import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirImgService {

  constructor() { }



  subirArchivo( archivo: File, tipo: String, id: string ) {

          return new Promise( ( resolve, reject) => {

           const formData = new FormData();
           const xhr = new XMLHttpRequest();

                  formData.append( 'img', archivo, archivo.name );

                    xhr.onreadystatechange = function() {
                      if ( xhr.readyState === 4 ) {
                        if (xhr.status === 200) {
                          console.log('img subida');
                          resolve( JSON.parse(xhr.response) );
                        } else {
                          console.log('Fallo carga de img');
                          reject( xhr.response );
                        }
                      }
                    };

                    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

                    xhr.open('PUT', url, true);
                    xhr.send( formData );
          });

  }
}
