import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPreviewCardComponent } from './product-preview-card.component';
import { cartIcon, cartSelectedIcon, heartIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { RouterModule } from '@angular/router';
import { CurtainsDirective } from '@shared/directives/curtains/curtains.directive';
import { CurtainsModule } from '@shared/directives/curtains/curtains.module';
import { ProductPriceModule } from '../product-price/product-price.module';



@NgModule({
  declarations: [
    ProductPreviewCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CurtainsModule,
    ProductPriceModule
  ],
  exports: [
    ProductPreviewCardComponent
  ]
})
export class ProductPreviewCardModule {
  constructor() {
  }
}
