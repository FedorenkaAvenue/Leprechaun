import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ProductPreviewCardModule } from '../product-preview-card/product-preview-card.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ProductPreviewCardModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
