import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductPageService } from './services/product-page.service';
import { ProductCharacteristicsComponent } from './components/product-characteristics/product-characteristics.component';
import { ProductAboutComponent } from './components/product-about/product-about.component';
import { ProductPhotosComponent } from './components/product-photos/product-photos.component';
import { LpchImagesSliderModule } from '@shared/components/lpch-images-slider/lpch-images-slider.module';
import { LpchTabsModule } from '@shared/components/lpch-tabs/lpch-tabs.module';
import { ProductPriceModule } from '@shared/components/product-price/product-price.module';
import { ProductAvailabilityModule } from '@shared/components/product-availability/product-availability.module';
// import { SwiperModule } from 'ngx-swiper-wrapper';
// import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 2
// };

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductCharacteristicsComponent,
    ProductAboutComponent,
    ProductPhotosComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    LpchImagesSliderModule,
    LpchTabsModule,
    ProductPriceModule,
    ProductAvailabilityModule
    // SwiperModule,
  ],
  providers: [
    ProductPageService,
    // {
    //   provide: SWIPER_CONFIG,
    //   useValue: PRODUCT_SWIPER_CONFIG
    // }
  
  ]
})
export class ProductPageModule { }
