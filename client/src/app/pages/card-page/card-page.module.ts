import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPageRoutingModule } from './card-page-routing.module';
import { CardPageComponent } from './components/card-page/card-page.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { closeIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { ProductPriceModule } from '@shared/components/product-price/product-price.module';
import { LpchInputModule } from '@shared/controls/lpch-input/lpch-input.module';
import { LpchPhoneModule } from '@shared/controls/lpch-phone/lpch-phone.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardPageComponent,
    CardItemComponent
  ],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    LeprachaunIconsModule,
    ProductPriceModule,
    LpchInputModule,
    LpchPhoneModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class CardPageModule { 
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
       closeIcon
      ]);
  }
}
