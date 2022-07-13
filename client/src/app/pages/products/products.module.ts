import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsService } from './services/products.service';
import { ProductCardModule } from '@shared/components/product-card/product-card.module';
import { PaginatorModule } from '@shared/modules/paginator';
import { LpchSelectModule } from '@shared/controls/lpch-select/lpch-select.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LpchInputModule } from '@shared/controls/lpch-input/lpch-input.module';
import { ProductsManagerService } from './services/products-manager/products-manager.service';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { cartIcon, cartSelectedIcon, heartIcon, heartIconFilled, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';

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
    LeprachaunIconsModule,
    PaginatorModule,
    LpchSelectModule,
    LpchInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductsService,
    ProductsManagerService,
  ]
})
export class ProductsModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
        cartIcon,
        heartIcon,
        heartIconFilled,
        cartSelectedIcon
      ]);
  }
}
