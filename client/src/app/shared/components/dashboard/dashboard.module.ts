import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ProductPreviewCardModule } from '../product-preview-card/product-preview-card.module';
import { cartIcon, cartSelectedIcon, heartIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ProductPreviewCardModule,
    LeprachaunIconsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
        cartIcon,
        cartSelectedIcon,
        heartIcon
      ]);
  }
}
