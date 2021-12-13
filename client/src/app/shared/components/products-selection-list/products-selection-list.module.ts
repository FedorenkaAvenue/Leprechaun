import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSelectionListComponent } from './products-selection-list.component';
import { ProductPreviewCardModule } from '../product-preview-card/product-preview-card.module';



@NgModule({
  declarations: [
    ProductsSelectionListComponent
  ],
  imports: [
    CommonModule,
    ProductPreviewCardModule,
  ],
  exports: [
    ProductsSelectionListComponent
  ]
})
export class ProductsSelectionListModule { }
