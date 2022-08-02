import { OverlayRef } from '@angular/cdk/overlay';
import { Type } from '@angular/core';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CustomOverlayRef } from '../../classes/custom-overlay-ref';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent {

  public contentType: 'template' | 'string' | 'component';
  public content: any;
  public context: any;
  public showCloseBtn = true;

  constructor(
    private readonly ref: CustomOverlayRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    // @Inject(MODAL_ADDITIONAL_CONFIG) private readonly customOverlayConfig: CustomOverlayConfig,
  ) {
    // super();
  }

  ngOnInit() {
    // removeScroll();

    this.content = this.ref.content;
    console.log(this.ref);
    
    this.detectContentType();

    const config = this.ref.overlay.getConfig();

    // const customConfig = this.customOverlayConfig;
    // if (customConfig && customConfig.overlayPointerEvents) {
    //   addPointerEvents();
    // }

    this.ref.changeContent$.pipe(
      // takeUntil(this.destroyStream$),
    ).subscribe(
      res => {
        this.content = res;
        this.detectContentType();
      }
    );
  }

  ngOnDestroy(): void {
    // super.ngOnDestroy();
    // addScroll();
    // const customConfig = this.customOverlayConfig;
    // if (customConfig && customConfig.overlayPointerEvents) {
    //   removePointerEvents();
    // }
  }


  public close() {
    this.ref.close(null);
  }

  private detectContentType(): void {
    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref),
      };
    } else {
      this.contentType = 'component';
    }
    // const customConfig = this.customOverlayConfig;
    // if (customConfig && customConfig.disableCloseBtn) {
    //   this.showCloseBtn = false;
    // }
  }
 
}
