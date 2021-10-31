import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { CurtainsDirective } from '@shared/directives/curtains/curtains.directive';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductCardComponent,
    CurtainsDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
