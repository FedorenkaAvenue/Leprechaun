import { Injectable } from '@angular/core';
import { ProductsPreviewI } from '@shared/models';
import { HistoryApiService } from '@shared/services/api_es/history-api/history-api.service';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { VIEWED_PRODUCTS } from 'app/mock/product-viewed-list';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class CabinetViewedService {


  constructor(
    private readonly historyApiService: HistoryApiService
  ) { }

  public getViewedProducts(): Observable<Array<ProductsPreviewI>> {
    return this.historyApiService.getProductsHistory()
  }

}
