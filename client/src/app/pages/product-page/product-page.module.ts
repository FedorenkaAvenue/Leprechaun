import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductPageService } from './services/product-page.service';
import { ProductCharacteristicsComponent } from './components/product-characteristics/product-characteristics.component';
import { ProductAboutComponent } from './components/product-about/product-about.component';
import { ProductPhotosComponent } from './components/product-photos/product-photos.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { PRODUCT_SWIPER_CONFIG } from '@shared/configs/swiper.config';
import { SwiperModule } from 'swiper/angular';

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
    IvyCarouselModule,
    SwiperModule,
  ],
  providers: [
    ProductPageService,
    {
      provide: SWIPER_CONFIG,
      useValue: PRODUCT_SWIPER_CONFIG
    }
  
  ]
})
export class ProductPageModule { }
