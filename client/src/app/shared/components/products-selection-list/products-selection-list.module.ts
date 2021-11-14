import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSelectionListComponent } from './products-selection-list.component';
import { ProductCardModule } from '../product-card/product-card.module';



@NgModule({
  declarations: [
    ProductsSelectionListComponent
  ],
  imports: [
    CommonModule,
    ProductCardModule,
  ],
  exports: [
    ProductsSelectionListComponent
  ]
})
export class ProductsSelectionListModule { }
