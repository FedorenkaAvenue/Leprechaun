import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPreviewCardComponent } from './product-preview-card.component';
import { LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { RouterModule } from '@angular/router';
import { ProductPriceModule } from '../product-price/product-price.module';



@NgModule({
  declarations: [
    ProductPreviewCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductPriceModule
  ],
  exports: [
    ProductPreviewCardComponent
  ]
})
export class ProductPreviewCardModule {
}
