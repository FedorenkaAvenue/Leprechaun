import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { CurtainsDirective } from '@shared/directives/curtains/curtains.directive';



@NgModule({
  declarations: [
    ProductCardComponent,
    CurtainsDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
