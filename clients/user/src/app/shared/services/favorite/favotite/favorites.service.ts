import { Injectable } from '@angular/core';
import { FavoriteDto } from '@shared/models';
import { FavoritesApiService } from '@shared/services/api_es/favorites-api/favorites-api.service';
import { CartStateService } from '@shared/services/cart/cart-state/cart-state.service';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FavoritesStateService } from '../favorite-state/favorites-state.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesValue$: BehaviorSubject<Array<FavoriteDto>>;
  constructor(
    private readonly favoritesApiService: FavoritesApiService,
    private readonly favoritesStateService: FavoritesStateService,
    private readonly cartService: CartStateService,
  ) {
    this.favoritesValue$ = new BehaviorSubject<Array<FavoriteDto>>(null);
  }

  public getFavoritesValue(): Observable<Array<FavoriteDto>> {
    return this.favoritesValue$.asObservable();
  }

  public getProducts(): Observable<any> {
    const cartState$ = this.cartService.getCartStateValue();
    const products$ = this.favoritesApiService.getProducts();
    const favoritesProducts$ = merge(products$, this.favoritesValue$).pipe(
      filter((res) => !!res),
    ) as Observable<Array<FavoriteDto>>;
    return combineLatest([favoritesProducts$, cartState$]).pipe(
      map(([favoritesProducts, cartValue]) => {
        favoritesProducts.map((favorite) => {
          const orderProducts = cartValue?.list.map((orderProduct) => orderProduct?.product?.id);
          favorite.product.inCart = orderProducts?.includes(favorite.product.id);
          return favorite;
        });
        return favoritesProducts;
      }),
    );
  }

  public addToFavorites(id: string): Observable<FavoriteDto> {
    return this.favoritesApiService.addProductToFavorites(id);
  }

  public deleteProduct(id: string): Observable<string> {
    return this.favoritesApiService.deleteProductFromFavorites(id).pipe(
      tap((favoriteId: string) => {
        const value = this.favoritesValue$.value;
        const favorites = value.filter((el) => el.id !== id);
        this.updateFavorites(favorites);
      }),
    );
  }

  public clearAllFavorites(): Observable<void> {
    return this.favoritesApiService.clearAllProductsFromFavorites();
  }

  public addToFavoriteSore(favorite: FavoriteDto): void {
    const value = this.favoritesValue$.value;
    this.updateFavorites([...value, favorite]);
  }

  public updateFavorites(favorites: Array<FavoriteDto>): void {
    this.favoritesValue$.next(favorites);
    this.favoritesStateService.updateFavorites(favorites);
  }
}
