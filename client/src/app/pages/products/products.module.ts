import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsService } from './services/products.service';
import { ProductCardModule } from '@shared/components/product-card/product-card.module';
import { PaginatorModule } from '@shared/modules/paginator';
import { LpchSelectModule } from '@shared/controls/lpch-select/lpch-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LpchInputModule } from '@shared/controls/lpch-input/lpch-input.module';


@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductsFilterComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductCardModule,
    PaginatorModule,
    LpchSelectModule,
    LpchInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
