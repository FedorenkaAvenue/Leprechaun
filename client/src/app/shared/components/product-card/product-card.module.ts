import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { CurtainsDirective } from '@shared/directives/curtains/curtains.directive';
import { RouterModule } from '@angular/router';
import { CurtainsModule } from '@shared/directives/curtains/curtains.module';
import { ProductPriceModule } from '../product-price/product-price.module';
import { ProductLabelsModule } from '../product-labels/product-labels.module';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CurtainsModule,
    ProductPriceModule,
    ProductLabelsModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule {}
