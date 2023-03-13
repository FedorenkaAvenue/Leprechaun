import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAvailabilityComponent } from './product-availability.component';


@NgModule({
  declarations: [
    ProductAvailabilityComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductAvailabilityComponent
  ]
})
export class ProductAvailabilityModule { }
