import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsService } from './services/products.service';


@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductsFilterComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
