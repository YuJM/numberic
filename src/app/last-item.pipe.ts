import { Pipe, PipeTransform } from '@angular/core';
import { IMathItem, MathItemType } from './views/p1/p1.component';

@Pipe({
  name: 'lastItem',
  pure: true
})
export class LastItemPipe implements PipeTransform {

  transform(value: IMathItem, check: MathItemType): boolean {
      console.log('pipe value', value);
    if (Array.isArray(value) && value.length >= 1) {
      return value[value.length - 1].type === check;
    }
    return false;
  }

}
