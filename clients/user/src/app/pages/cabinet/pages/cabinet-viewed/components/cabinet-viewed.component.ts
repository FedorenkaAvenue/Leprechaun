import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FavoriteDto, FavoriteProductDto, OrderDto, ProductsPreviewI } from '@shared/models';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CabinetViewedComponent implements OnInit, OnDestroy {
  public viewedData$: Observable<Array<ProductsPreviewI>>;
  public cartSubscription: Subscription;
  public clearViewedSubscription: Subscription;
  public addFavoriteSubscription: Subscription;
  public deleteFavoriteSubscription: Subscription;
  public viewedProductsSubscription: Subscription;
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly cartService: CartService,
    private readonly cabinetViewedService: CabinetViewedService,
    private readonly lpchRouterService: LpchRouterService,
  ) {}

  ngOnInit(): void {
    this.cabinetViewedService.init();
    this.viewedProductsSubscription = this.cabinetViewedService.getViewedProducts().subscribe((viewed: Array<ProductsPreviewI>) => {
      this.cabinetViewedService.updateViewed(viewed);
    });

    this.viewedData$ = this.cabinetViewedService.getProducts()
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.addFavoriteSubscription) {
      this.addFavoriteSubscription.unsubscribe();
    }
    if (this.deleteFavoriteSubscription) {
      this.deleteFavoriteSubscription.unsubscribe();
    }
    if (this.clearViewedSubscription) {
      this.clearViewedSubscription.unsubscribe();
    }
    if (this.viewedProductsSubscription) {
      this.viewedProductsSubscription.unsubscribe();
    }
    this.cabinetViewedService.destroy();
  }

  public addToCart(productId: string): void {
    const productinCart = this.cartService.checkAvailabilityInCart(productId);
    if (productinCart) {
      this.lpchRouterService.navigateToCart();
      return;
    }
    this.cartSubscription = this.cartService.addToCart(productId).subscribe((order: OrderDto) => {
      this.cartService.updateCart(order);
    });
  }

  public addToFavorite(productId: string): void {
    this.addFavoriteSubscription = this.favoritesService
      .addToFavorites(productId)
      .pipe(take(1))
      .subscribe((favorite: FavoriteDto) => {
        this.favoritesService.addToFavoriteSore(favorite);
      });
  }

  public deleteFromFavorite(productId: string): void {
    this.deleteFavoriteSubscription = this.favoritesService
      .deleteProduct(productId)
      .subscribe((favorites: any) => {});
  }

  public deleteFromViewed(): void {
    this.clearViewedSubscription = this.cabinetViewedService.clearProductHistory().subscribe(res => {
      this.cabinetViewedService.updateViewed([])
    })
  }
}
