import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetWishlistRoutingModule } from './cabinet-wishlist-routing.module';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { closeIcon, LeprachaunIconRegistryService, LeprachaunIconsModule, trashIcon } from '@shared/modules/leprachaun-icons';
import { ProductPriceModule } from '@shared/components/product-price/product-price.module';
import { ProductPreviewCardModule } from '@shared/components/product-preview-card/product-preview-card.module';
import { ProductCardModule } from '@shared/components/product-card/product-card.module';
import { FavoritesApiService } from '@shared/services/api_es/favorites-api/favorites-api.service';
import { FavoritesPageService } from './services/favorites-page.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    CabinetWishlistRoutingModule,
    LeprachaunIconsModule,
    ProductPriceModule,
    ProductPreviewCardModule,
    ProductCardModule,
    TranslateModule.forChild(),
  ],
  providers: [
    FavoritesApiService,
    FavoritesPageService
  ]
})
export class CabinetWishlistModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
       closeIcon,
       trashIcon
      ]);
  }
}
