import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'numberBySpace'
})
export class NumberBySpacePipe implements PipeTransform {
  transform(value: string | number | null): string | number | null {
    if (typeof value === 'undefined' || value === null) {
      return value;
    }
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
  }
}