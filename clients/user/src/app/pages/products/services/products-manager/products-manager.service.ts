import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Products } from '@shared/models';
import { CartStateService } from '@shared/services/cart/cart-state/cart-state.service';
import { FavoritesStateService } from '@shared/services/favorite/favorite-state/favorites-state.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductsManagerService {

  public products$: Observable<Products>;
  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartStateService,
    private readonly favoritesStateService: FavoritesStateService,
    private readonly favoritesService: FavoritesService,
    
    ) { }


  public changeParams(params:  Params): void {
    this.productsService.changeParams(params);
  }

  public init(): void {
    this.productsService.init();
  }

  public destroy(): void {
    this.productsService.destroy();
  }

  public getProducts(categoryId?: string): Observable<Products> {
    const cartState$ = this.cartService.getCartStateValue();
    const favoriteState$ = this.favoritesService.getFavoritesValue();
    const products$ = this.productsService.getProducts(categoryId);
    return combineLatest([cartState$, favoriteState$, products$]).pipe(
      map(([cartValue, favoriteValue, products]) => {
        products.data.map(el => {
          const orderProducts = cartValue?.list.map(orderProduct => orderProduct?.product?.id);
          el.inCart = orderProducts?.includes(el.id);
          el.favoriteId = favoriteValue?.find(favorite => favorite.product.id === el.id)?.id; 
          el.isFavorite = !!el.favoriteId;
          return el;
        })
        return products
      })
    )
  }
}
