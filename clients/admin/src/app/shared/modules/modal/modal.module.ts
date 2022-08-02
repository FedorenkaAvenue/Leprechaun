import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './components/overlay/overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayService } from './services/overlay.service';
import { PortalModule } from '@angular/cdk/portal';
import { MODAL_DATA } from './classes/modal.data';



@NgModule({
  declarations: [
    OverlayComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  providers: [
    OverlayService,
    {provide: MODAL_DATA, useValue: {}},
  ]
})
export class ModalModule { }
