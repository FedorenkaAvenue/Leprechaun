import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPriceComponent } from './product-price.component';



@NgModule({
  declarations: [
    ProductPriceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ProductPriceComponent]
})
export class ProductPriceModule { }
