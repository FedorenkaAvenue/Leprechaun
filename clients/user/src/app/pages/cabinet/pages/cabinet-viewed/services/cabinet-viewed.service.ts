import { Injectable } from '@angular/core';
import { ProductsPreviewI } from '@shared/models';
import { HistoryApiService } from '@shared/services/api_es/history-api/history-api.service';
import { CartStateService } from '@shared/services/cart/cart-state/cart-state.service';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { VIEWED_PRODUCTS } from 'app/mock/product-viewed-list';
import { BehaviorSubject, combineLatest, EMPTY, filter, map, Observable, of } from 'rxjs';
import { threadId } from 'worker_threads';

@Injectable()
export class CabinetViewedService {

  private viewedValue$: BehaviorSubject<Array<ProductsPreviewI>>;
   
  constructor(
    private readonly historyApiService: HistoryApiService,
    private readonly cartService: CartStateService,
    private readonly favoritesService: FavoritesService,
  ) { }


  public getViewedValues(): Observable<Array<ProductsPreviewI>> {
    return this.viewedValue$.asObservable();
  }

  public getViewedProducts(): Observable<Array<ProductsPreviewI>> {
    return this.historyApiService.getProductsHistory()
  }
  
  public updateViewed(viewed: Array<ProductsPreviewI>): void {
    this.viewedValue$.next(viewed);
  }

  public getProducts(): Observable<Array<ProductsPreviewI>> {
    const cartState$ = this.cartService.getCartStateValue();
    const favoriteState$ = this.favoritesService.getFavoritesValue();
    const viewed$ = this.getViewedValues().pipe(filter((res) => !!res))
    return combineLatest([cartState$, favoriteState$, viewed$]).pipe(
      map(([cartValue, favoriteValue, products]) => {
        products.map(el => {
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

  public clearProductHistory(): Observable<Array<any>> {
    return this.historyApiService.clearProductHistory(); 
  }

  public init(): void {
    this.viewedValue$ = new BehaviorSubject<Array<ProductsPreviewI>>(null);
  }

  public destroy(): void {
    this.viewedValue$.complete();
  } 

}
