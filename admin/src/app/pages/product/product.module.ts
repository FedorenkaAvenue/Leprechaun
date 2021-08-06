import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsService } from './sevices/products.service';
import { ProductsApiService } from 'src/app/shared/services/products/products-api.service';


@NgModule({
  declarations: [
    ProductPageComponent,
    ProductFormComponent,
    EditProductComponent,
    CreateProductComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  providers: [
    ProductsService,
    ProductsApiService,
  ]
})
export class ProductModule { }
