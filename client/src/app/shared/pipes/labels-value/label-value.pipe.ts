import { Pipe, PipeTransform } from '@angular/core';

const labels = [
  {
    type: 'new',
    value: 'новинки',
  },
  {
    type: 'popular',
    value: 'популярнi',
  },
  {
    type: 'discount',
    value: '',
  },
];
@Pipe({
  name: 'labelValue',
})
export class LabelValuePipe implements PipeTransform {
  transform(data: any): string {
    console.log(data);
    
    const obj = labels?.find(el => el?.type === data?.type);
    console.log(obj);
    
   return obj?.value || data?.value;
  }
}
