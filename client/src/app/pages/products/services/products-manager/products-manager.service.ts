import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Products } from '@shared/models';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
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
    private readonly cardService: CardStateService,
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

  public getProducts(): Observable<Products> {
    const cardState$ = this.cardService.getCardStateValue();
    const favoriteState$ = this.favoritesService.getFavoritesValue();
    const products$ = this.productsService.getProducts();
    return combineLatest([cardState$, favoriteState$, products$]).pipe(
      map(([cardValue, favoriteValue, products]) => {
        products.data.map(el => {
          const orderProducts = cardValue?.list.map(orderProduct => orderProduct?.product?.id);
          const favoritesProducts = favoriteValue?.map(el => el.id)
          el.inCard = orderProducts?.includes(el.id);
          el.isFavorite = favoritesProducts?.includes(el.id);
          return el;
        })
        return products
      })
    )
  }
}
