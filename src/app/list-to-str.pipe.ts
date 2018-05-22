import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listToStr'
})
export class ListToStrPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (Array.isArray(value)) {
      return value.join('');
    }
    return value;
  }

}
