import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductPageService } from './services/product-page.service';


@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule
  ],
  providers: [ProductPageService]
})
export class ProductPageModule { }
