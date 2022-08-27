import { Injectable } from '@angular/core';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { VIEWED_PRODUCTS } from 'app/mock/product-viewed-list';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class CabinetViewedService {


  constructor(
  ) { }

  public getViewedProducts(): Observable<any> {
    return of(VIEWED_PRODUCTS)
  }

}
