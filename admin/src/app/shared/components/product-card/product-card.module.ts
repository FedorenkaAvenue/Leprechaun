import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DefaultImageModule } from '../../directives/default-image/default-image.module';
import { ProductCardComponent } from './product-card.component';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    DefaultImageModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
