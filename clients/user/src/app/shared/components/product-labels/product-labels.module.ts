import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLabelsComponent } from './product-labels.component';
import { LabelsValueModule } from '@shared/pipes/labels-value/labels-value.module';



@NgModule({
  declarations: [
    ProductLabelsComponent
  ],
  imports: [
    CommonModule,
    LabelsValueModule
  ],
  exports: [
    ProductLabelsComponent
  ]
})
export class ProductLabelsModule { }
