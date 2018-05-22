import { Pipe, PipeTransform } from '@angular/core';
import { MathItemType } from './numberic.enum';
import { IMathItem} from './numberic.interface';

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
