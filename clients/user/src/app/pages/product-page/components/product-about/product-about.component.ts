import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { PRODUCT_SWIPER_CONFIG } from '@shared/configs/swiper.config';
import { OrderDto, ProductDetailsI } from '@shared/models';
import { CartStateService } from '@shared/services/cart/cart-state/cart-state.service';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { LpchRouterService } from '@shared/services/router/lpch-router.service';
import { environment } from 'environments/environment.global';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
  public productDetails: ProductDetailsI;
  public productinCart: boolean;
 

  constructor(
    private readonly productPageService: ProductPageService,
    private readonly route: ActivatedRoute,
    private readonly cartService: CartService,
    private readonly lpchRouterService: LpchRouterService,
    private readonly cartStateService: CartStateService,
    private readonly cd: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    combineLatest([this.productPageService.product$.pipe(filter(el => !!el)), this.cartStateService.getCartStateValue().pipe(filter(el => !!el))])
  .subscribe(([product, cart]) => {
    console.log(3423423423);
    
    this.productDetails = product;
    this.productinCart = this.cartService.checkAvailabilityInCart(this.productDetails.id);
    console.log(this.productinCart);
    
    this.cd.detectChanges()
  });
  
  }

  public addToCart(productId: string): void {
    if (this.productinCart) {
      this.lpchRouterService.navigateToCart();
      return;
    }
    this.cartService.addToCart(productId).subscribe((order: OrderDto) => {
      this.cartService.updateCart(order);
    });
  }


}
