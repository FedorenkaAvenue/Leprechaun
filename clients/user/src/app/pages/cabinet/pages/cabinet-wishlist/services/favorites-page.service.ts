import { Injectable } from '@angular/core';
import { FavoritesApiService } from '@shared/services/api_es/favorites-api/favorites-api.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class FavoritesPageService {

  private favoriteProducts$: Observable<any>
  constructor(
    private readonly favoritesApiService: FavoritesApiService
  ) {
    this.favoriteProducts$ = this.getProducts();
  }

  public getProducts(): Observable<any[]> {
     return this.favoritesApiService.getProducts()
   }
}
