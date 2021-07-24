import { TranslocoLoader, Translation } from '@ngneat/transloco';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { join } from 'path';

const fs = require('fs');

const distFolder = join(process.cwd(), 'dist/student-apply/browser');

export class TranslocoServerLoader implements TranslocoLoader {
  constructor(
    private transferState: TransferState,
  ) { }

  getTranslation(lang: string): Observable<Translation> | Promise<Translation> {
    return new Observable((observer) => {
      const jsonData: any = JSON.parse(
        fs.readFileSync(join(distFolder, `/assets/i18n/${lang}.json`), 'utf8'),
      );
      const key: StateKey<number> = makeStateKey<number>(`transfer-translate-${lang}`);
      this.transferState.set(key, jsonData);
      observer.next(jsonData);
      observer.complete();
    });
  }
}
