import { Injectable } from '@angular/core';
import { FavoritesApiService } from '@shared/services/api_es/favorites-api/favorites-api.service';
import { LocalStorageService } from '@shared/storage/local.storage';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FavoritesStateService } from '../favorite-state/favorites-state.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  private favoritesValue$: BehaviorSubject<Array<string>>;
  constructor(
    private readonly favoritesApiService: FavoritesApiService,
    private readonly favoritesStateService: FavoritesStateService
  ) {
    this.favoritesValue$ = new BehaviorSubject<any>(null); 
  }

  public getFavoritesValue(): Observable<any> {
    return this.favoritesValue$.asObservable();
  }
  
  public getProducts(): Observable<any> {
    const products = this.favoritesApiService.getProducts()
    return merge(products, this.favoritesValue$).pipe(filter(res => !!res))
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
