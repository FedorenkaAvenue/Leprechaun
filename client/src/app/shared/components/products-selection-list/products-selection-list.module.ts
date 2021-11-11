import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSelectionListComponent } from './products-selection-list.component';



@NgModule({
  declarations: [
    ProductsSelectionListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsSelectionListComponent
  ]
})
export class ProductsSelectionListModule { }
