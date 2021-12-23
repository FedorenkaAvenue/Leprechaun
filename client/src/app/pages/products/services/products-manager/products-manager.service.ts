import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Products } from '@shared/models';
import { CardStateService } from '@shared/services/card/card-state.service';
import { FavoriteStateService } from '@shared/services/favorite/favorite.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductsManagerService {

  public products$: Observable<Products>;
  constructor(
    private readonly productsService: ProductsService,
    private readonly cardService: CardStateService,
    private readonly FavoriteStateService: FavoriteStateService,
    
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
    const favoriteState$ = this.FavoriteStateService.getFavoriteStateValue();
    const products$ = this.productsService.getProducts();
    return combineLatest([cardState$, favoriteState$, products$]).pipe(
      map(([cardValue, favoriteValue, products]) => {
        products.data.map(el => {
          el.inCard = cardValue.includes(el.id);
          el.isFavorite = favoriteValue.includes(el.id);
          return el;
        })
        return products
      })
    )
    
    
    this.productsService.getProducts();
  }
}
