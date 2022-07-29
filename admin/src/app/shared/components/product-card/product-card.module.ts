import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LpchImageModule } from '../lpch-image/lpch-image.module';
import { ProductCardComponent } from './product-card.component';


@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    LpchImageModule
  ],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
