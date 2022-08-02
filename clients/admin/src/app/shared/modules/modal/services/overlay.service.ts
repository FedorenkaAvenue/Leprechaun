import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Type } from '@angular/core';
import { Injectable, Injector, NgZone, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomOverlayRef } from '../classes/custom-overlay-ref';
import { MODAL_DATA } from '../classes/modal.data';
import { OverlayComponent } from '../components/overlay/overlay.component';
import { CustomOverlayConfig, LeChModalConfig } from '../inerfaces/overlay-conf';


const DEFAULT_CONFIG: LeChModalConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable()
export class OverlayService {


  public isOpen: Subject<boolean>;
  public get isOpen$() {
    return this.isOpen.asObservable();
  } 
  
  constructor(
    private overlay: Overlay,
    private readonly zone: NgZone,
    private readonly injector: Injector,
  ) {
    this.init();
  }

  open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>,
    data: T,
    config?: OverlayConfig,
    additionalConfig?: CustomOverlayConfig | null,
  ): CustomOverlayRef<R> {
    // Returns an OverlayRef (which is a PortalHost)

    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    const configs = {...dialogConfig, ...config};

    const overlayRef = this.overlay.create(configs);
    const customOverlayRef = new CustomOverlayRef<R, T>(overlayRef, content, data, additionalConfig);
    const injector = this.createInjector(customOverlayRef, this.injector, data, additionalConfig);
    this.zone.run(() => {
      overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));
    });
    return customOverlayRef;
  }

  private getOverlayConfig(config: LeChModalConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: LeChModalConfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }


  private createInjector(
    ref: CustomOverlayRef,
    inj: Injector,
    data: any | null = null,
    additionalConfig: CustomOverlayConfig | null = null,
  ): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(CustomOverlayRef, ref);
    injectorTokens.set(MODAL_DATA, data);
    // injectorTokens.set(MODAL_ADDITIONAL_CONFIG, additionalConfig);
    return new PortalInjector(inj, injectorTokens);
  }
  
  private init(): void {
    this.isOpen = new Subject();
    this.isOpen$.subscribe(res => {
      console.log(res);
      
    })
  }

  private destroy(): void {
    this.isOpen.complete();
  }

}
