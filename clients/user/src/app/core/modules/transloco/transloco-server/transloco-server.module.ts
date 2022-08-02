import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoServerLoader } from './transloco-server-loader';
import { TranslocoModule, TRANSLOCO_CONFIG, translocoConfig, TRANSLOCO_LOADER } from '@ngneat/transloco';
import { TransferState } from '@angular/platform-browser';
import { CURRENT_TRANSLOCO_CONFIG } from '../static/transloco.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig(CURRENT_TRANSLOCO_CONFIG),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoServerLoader, deps: [TransferState] },
  ]
})
export class TranslocoServerModule { }
