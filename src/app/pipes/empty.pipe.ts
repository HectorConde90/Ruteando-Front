import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  transform(valor): unknown {
    
    if (valor == null) {
      return 'Indefinido';
    } else {
      return valor + ' km';
    }
     
  }

}
