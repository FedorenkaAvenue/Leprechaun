import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCT_SWIPER_CONFIG } from '@shared/configs/swiper.config';
import { ProductDetailsI } from '@shared/models';
import { Observable } from 'rxjs';
import { ProductPageService } from '../../services/product-page.service';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Swiper, Virtual } from 'swiper';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-product-about',
  templateUrl: './product-about.component.html',
  styleUrls: ['./product-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductAboutComponent implements OnInit {
  
  public currentImage: string = 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg';
  public productDetails$: Observable<ProductDetailsI>;
  public config = PRODUCT_SWIPER_CONFIG;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  virtualSlides = Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`);
  constructor(
    private readonly productPageService: ProductPageService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productDetails$ = this.productPageService.product$;
  }

  onSwiper(event): void {
    console.log(event);
  }

  onSlideChange(event: Swiper ): void {
    console.log(event.activeIndex);
    
  }

  prev(): void {
    this.swiper.swiperRef.slidePrev(100)
  }

  next(): void {
    console.log(this.swiper);
    
    this.swiper.swiperRef.slideNext(100)
  }
}
