import { Injectable } from '@angular/core';
import { FavoriteProductDto, DasboardCommonProductsI, ProductsPreviewI, DasboardUserProductsI, FavoriteDto } from '@shared/models';
import { HomeApiService } from '@shared/services/api_es/home-api/home-api.service';
import { ProductsApiService } from '@shared/services/api_es/products-api/products-api.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { HistoryService } from '@shared/services/history/history.service';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class HomeService {
  constructor(
    private readonly homeApiService: HomeApiService,
    private readonly favoritesService: FavoritesService,
    private readonly historyService: HistoryService,
    private readonly productsApiService: ProductsApiService,
  ) {}

  public getSelectionProducts(): Observable<DasboardCommonProductsI> {
    const favoriteState$ = this.favoritesService.getFavoritesValue();
    const products$ = this.homeApiService.getSelectionProducts();
    return combineLatest([favoriteState$, products$.pipe(shareReplay(1))]).pipe(
      map(([favoriteValue, products]) => {
        products.newest.map((el) => this.updateFavorites(el, favoriteValue));
        products.popular.map((el) => this.updateFavorites(el, favoriteValue));
        return products;
      }),
      shareReplay(1)
    );
  }

  public getUserSelectionProducts(): Observable<DasboardUserProductsI> {
    const favoriteState$ = this.favoritesService.getFavoritesValue();
    const products$ = this.homeApiService.getUserSelectionProducts();
    return combineLatest([favoriteState$, products$]).pipe(
      map(([favoriteValue, products]) => {
        products.history.map((el) => this.updateFavorites(el, favoriteValue));
        return products;
      }),
    );
  }

  public getCategoryList(): Observable<any> {
    return this.productsApiService.getCategoryList();
  }
    // TO DO FROM USER
  // public getHistoryProducts(): Observable<Array<ProductsPreviewI>> {
  //   const favoriteState$ = this.favoritesService.getFavoritesValue();
  //   const products$ = this.historyService.getHistoryProducts();
  //   return combineLatest([favoriteState$, products$]).pipe(
  //     map(([favoriteValue, products]) => {
  //       products.map((el) => this.updateFavorites(el, favoriteValue));
  //       return products;
  //     }),
  //   );
  // }
  
  private updateFavorites(
    product: ProductsPreviewI,
    favorites: Array<FavoriteDto>,
  ): ProductsPreviewI {
    const favoritesProducts = favorites?.map((el) => el.id);
    product.favoriteId = favorites?.find(favorite => favorite.product.id === product.id)?.id; 
    product.isFavorite = !!product.favoriteId;
    return product;
  }
} 