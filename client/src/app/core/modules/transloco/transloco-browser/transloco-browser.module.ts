import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRANSLOCO_CONFIG, translocoConfig, TRANSLOCO_LOADER, TranslocoModule } from '@ngneat/transloco';
import { CURRENT_TRANSLOCO_CONFIG } from '../static/transloco.config';
import { TranslocoBrowserLoader } from './transloco-browser-loader';
import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';

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
    { provide: TRANSLOCO_LOADER, useClass: TranslocoBrowserLoader, deps: [HttpClient, TransferState] },
  ]
})
export class TranslocoBrowserModule { }
