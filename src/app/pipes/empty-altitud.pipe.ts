import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyAltitud'
})
export class EmptyAltitudPipe implements PipeTransform {

  transform(valor): unknown {
    
    if (valor == null) {
      return 'Indefinido';
    } else {
      return valor + ' m';
    }
  }

}
