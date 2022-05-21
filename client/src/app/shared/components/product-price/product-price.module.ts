import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPriceComponent } from './product-price.component';
import { NumberBySpaceModule } from '@shared/pipes/number-by-space/number-by-space.module';



@NgModule({
  declarations: [
    ProductPriceComponent
  ],
  imports: [
    CommonModule,
    NumberBySpaceModule
  ],
  exports: [ProductPriceComponent]
})
export class ProductPriceModule { }
