import { TranslocoLoader, Translation } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { TransferState, StateKey, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export class TranslocoBrowserLoader implements TranslocoLoader {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
  ) { }

  getTranslation(lang: string): Observable<Translation> | Promise<Translation> {
    const key: StateKey<number> = makeStateKey<number>(`transfer-translate-${lang}`);
    const data: any = this.transferState.get(key, null);
    if (data) {
      return new Observable((observer) => {
        observer.next(data);
        observer.complete();
      });
    } else {
      return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }
  }
}

