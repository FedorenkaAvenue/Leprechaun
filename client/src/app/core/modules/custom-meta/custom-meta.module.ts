import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslocoService } from '@ngneat/transloco';



export function metaFactory(translate: TranslocoService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string) => translate.translate(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'APP_NAME',
    defaults: {
      title: 'DEFAULT_TITLE',
      description: 'DEFAULT_DESC',
      'og:image': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US,nl_NL,tr_TR'
    }
  });
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [TranslocoService]
    })
  ]
})

export class CustomMetaModule { }
