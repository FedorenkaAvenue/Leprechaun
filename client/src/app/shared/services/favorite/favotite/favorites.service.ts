import { Injectable } from '@angular/core';
import { FavoritesApiService } from '@shared/services/api_es/favorites-api/favorites-api.service';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
import { LocalStorageService } from '@shared/storage/local.storage';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FavoritesStateService } from '../favorite-state/favorites-state.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  private favoritesValue$: BehaviorSubject<Array<string>>;
  constructor(
    private readonly favoritesApiService: FavoritesApiService,
    private readonly favoritesStateService: FavoritesStateService,
    private readonly cardService: CardStateService,
  ) {
    this.favoritesValue$ = new BehaviorSubject<any>(null); 
  }

  public getFavoritesValue(): Observable<any> {
    return this.favoritesValue$.asObservable();
  }
  
  public getProducts(): Observable<any> {
    const cardState$ = this.cardService.getCardStateValue();
    const products$ = this.favoritesApiService.getProducts();
    const favoritesProducts$ = merge(products$, this.favoritesValue$).pipe(filter(res => !!res)) as Observable<Array<any>>
    return combineLatest([favoritesProducts$, cardState$]).pipe(
      map(([favoritesProducts, cardValue]) => {
        favoritesProducts.map((product) => {
          const orderProducts = cardValue?.list.map(orderProduct => orderProduct?.product?.id);
          product.inCard = orderProducts?.includes(product.id);
          return product;
        })
        return favoritesProducts;
      })
    )
  }

  public addToFavorites(id: string): Observable<any> {
    return this.favoritesApiService.addProductToFavorites(id)
  }

  public deleteProduct(id: string): Observable<any> {
    return this.favoritesApiService.deleteProductFromFavorites(id)
  }

  public updateFavorites(order: any): void {
    this.favoritesValue$.next(order);
    this.favoritesStateService.updateFavorites(order);
  }
}
