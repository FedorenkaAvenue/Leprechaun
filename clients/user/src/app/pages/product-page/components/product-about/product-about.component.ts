import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { PRODUCT_SWIPER_CONFIG } from '@shared/configs/swiper.config';
import { ProductDetailsI } from '@shared/models';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';
import { ProductPageService } from '../../services/product-page.service';

// import { SwiperComponent } from "swiper/angular";
// import SwiperCore, { Swiper, Virtual } from 'swiper';

// SwiperCore.use([Virtual]);


@Component({
  selector: 'app-product-about',
  templateUrl: './product-about.component.html',
  styleUrls: ['./product-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class ProductAboutComponent implements OnInit {
  
  public currentImage: string = 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg';
  public productDetails$: Observable<ProductDetailsI>;

 

  constructor(
    private readonly productPageService: ProductPageService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productDetails$ = this.productPageService.product$;
  }





}
