import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPageRoutingModule } from './cart-page-routing.module';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { closeIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { ProductPriceModule } from '@shared/components/product-price/product-price.module';
import { LpchInputModule } from '@shared/controls/lpch-input/lpch-input.module';
import { LpchPhoneModule } from '@shared/controls/lpch-phone/lpch-phone.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LpchCounterInputModule } from '@shared/controls/lpch-counter-input/lpch-counter-input.module';
import { CartItemsListComponent } from './components/cart-items-list/cart-items-list.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LpchImageModule } from '@shared/components/lpch-image/lpch-image.module';

@NgModule({
  declarations: [
    CartPageComponent,
    CartItemComponent,
    CartItemsListComponent,
    CartDetailsComponent
  ],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    LeprachaunIconsModule,
    ProductPriceModule,
    LpchInputModule,
    LpchPhoneModule,
    ReactiveFormsModule,
    LpchCounterInputModule,
    LpchImageModule
  ],
  providers: [
  ]
})
export class CartPageModule { 
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
       closeIcon
      ]);
  }
}
