import { OverlayRef } from '@angular/cdk/overlay';
import { Type } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CustomOverlayConfig, OverlayCloseEvent } from '../inerfaces/overlay-conf';

export class CustomOverlayRef<R = any | null, T = any> {

    public afterClosed$ = new Subject<OverlayCloseEvent<T | null>>();
    public changeContent$ = new Subject<string | TemplateRef<any> | Type<any>>();
    private destoyStream$ = new Subject();
    private backdropClickData: T | null = null;
  
    constructor(
      public readonly overlay: OverlayRef,
      public readonly content: string | TemplateRef<any> | Type<any>,
      public readonly data: T,
      private customOverlayConfig?: CustomOverlayConfig | null,
    ) {
      this.onBackdropClick();
    }
  
    public close(data: T | null) {
      this.dispose('close', data);
    }
  
    public updateContent(content: string | TemplateRef<any> | Type<any>) {
      this.changeContent$.next(content);
    }
  
    public setBackdropClickData(data: T): void {
      this.backdropClickData = data;
    }
  
    private dispose(type: 'backdropClick' | 'close', data: T | null) {
      this.overlay.dispose();
      this.afterClosed$.next({
        type,
        data
      });
      this.destroy();
    }
  
    private onBackdropClick(): void {
      const config = this.customOverlayConfig;
      const preventBackdropClick = config && config.preventBackdropClick;
      if (preventBackdropClick) {
        return;
      }
      this.overlay.backdropClick()
        .pipe(
          take(1),
          takeUntil(this.destoyStream$),
        )
        .subscribe(() => this.dispose('backdropClick', this.backdropClickData));
    }
  
    private destroy(): void {
      this.destoyStream$.next();
      this.destoyStream$.complete();
      this.afterClosed$.complete();
      this.changeContent$.complete();
    }
  }