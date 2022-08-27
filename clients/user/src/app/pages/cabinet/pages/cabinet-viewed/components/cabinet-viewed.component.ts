import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FavoritesDto, OrderDto } from '@shared/models';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { LpchRouterService } from '@shared/services/router/lpch-router.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CabinetViewedService } from '../services/cabinet-viewed.service';

@Component({
  selector: 'app-cabinet-viewed',
  templateUrl: './cabinet-viewed.component.html',
  styleUrls: ['./cabinet-viewed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetViewedComponent implements OnInit, OnDestroy {

  public viewedData$: Observable<[]>;
  public cartSubscription: Subscription;
  public addFavoriteSubscription: Subscription;
  public deleteFavoriteSubscription: Subscription;
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly cartService: CartService,
    private readonly cabinetViewedService: CabinetViewedService,
    private readonly lpchRouterService: LpchRouterService,
  ) { }

  ngOnInit(): void {
    this.viewedData$ = this.cabinetViewedService.getViewedProducts();
    this.viewedData$.subscribe(res => {
      console.log(res);
      
    })
  }

  ngOnDestroy(): void {
    if(this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if(this.addFavoriteSubscription) {
      this.addFavoriteSubscription.unsubscribe();
    }
    if(this.deleteFavoriteSubscription) {
      this.deleteFavoriteSubscription.unsubscribe();
    }
  }


  public addToCart(productId: string): void {
    const productinCart = this.cartService.checkAvailabilityInCart(productId);
    if (productinCart) {
      this.lpchRouterService.navigateToCart();
      return;
    }
    this.cartSubscription = this.cartService.addToCart(productId).subscribe((order: OrderDto) => {
      this.cartService.updateCart(order);
    })
  }

  public addToFavorite(productId: string): void {
    this.addFavoriteSubscription = this.favoritesService
      .addToFavorites(productId)
      .pipe(take(1))
      .subscribe((favorites: Array<FavoritesDto>) => {
        this.favoritesService.updateFavorites(favorites);
      });
  }

  public deleteFromFavorite(productId: string): void {
    this.deleteFavoriteSubscription = this.favoritesService.deleteProduct(productId).subscribe((favorites: any) => {
      this.favoritesService.updateFavorites(favorites);
    });
  }

  public deleteFromViewed(): void {
    
  }

}
