import { Injectable } from '@angular/core';
import { FavoritesDto, ProductsCommonI, ProductsPreviewI } from '@shared/models';
import { HomeApiService } from '@shared/services/api_es/home-api/home-api.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { HistoryService } from '@shared/services/history/history.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService {
  constructor(
    private readonly homeApiService: HomeApiService,
    private readonly favoritesService: FavoritesService,
    private readonly historyService: HistoryService,
  ) {}

  public getSelectionProducts(): Observable<ProductsCommonI> {
    const favoriteState$ = this.favoritesService.getFavoritesValue();
    const products$ = this.homeApiService.getSelectionProducts();
    return combineLatest([favoriteState$, products$]).pipe(
      map(([favoriteValue, products]) => {
        products.newest.map((el) => this.updateFavorites(el, favoriteValue));
        products.popular.map((el) => this.updateFavorites(el, favoriteValue));
        return products;
      }),
    );
  }
  
  public getHistoryProducts(): Observable<Array<ProductsPreviewI>> {
    const favoriteState$ = this.favoritesService.getFavoritesValue();
    const products$ = this.historyService.getHistoryProducts();
    return combineLatest([favoriteState$, products$]).pipe(
      map(([favoriteValue, products]) => {
        products.map((el) => this.updateFavorites(el, favoriteValue));
        return products;
      }),
    );
  }
  
  private updateFavorites(
    products: ProductsPreviewI,
    favorites: Array<FavoritesDto>,
  ): ProductsPreviewI {
    const favoritesProducts = favorites?.map((el) => el.id);
    products.isFavorite = favoritesProducts?.includes(products.id);
    return products;
  }
}