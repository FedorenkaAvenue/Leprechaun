import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPreviewCardComponent } from './product-preview-card.component';
import { RouterModule } from '@angular/router';
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
