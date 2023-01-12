import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.global';
import { TranslationFields } from '../../models/translation.model';


@Pipe({
  name: 'valueDefaultTranslation'
})
export class ValueDefaultTranslationPipe implements PipeTransform {

  transform(value: TranslationFields): string {
    const lang = environment.langs.split(',')?.[0]
    return value[lang];
  }

}
