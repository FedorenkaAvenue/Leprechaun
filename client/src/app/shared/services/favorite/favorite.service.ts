import { Injectable } from '@angular/core';
import { LocalStorageService } from '@shared/storage/local.storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  
  private favoriteState$: BehaviorSubject<Array<number>>;
  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    const favoriteValue = this.localStorageService.getItem<Array<number>>('favorite') || [];
    this.favoriteState$ = new BehaviorSubject<Array<number>>(favoriteValue);
  }

  public updateFavorite(): void {
    const value = this.getFavoriteValueFromLocalStorage() || [];
    this.favoriteState$.next(value);
  }

  public addToFavorite(productId): void {
    const storageItem = this.localStorageService.getItem('favorite');
    const storageList = storageItem && Array.isArray(storageItem) ? storageItem : [];
    const index = storageList.findIndex(el => el === productId);
    console.log(index);
    
    if(index == -1) {
      console.log(23);
      
      storageList.push(productId);
    } else {
      console.log(56);
      storageList.splice(index, 1);
    }

    console.log(storageList);
    
    this.localStorageService.setItem('favorite', storageList);
    this.updateFavorite();
  }

  public getFavoriteValueFromLocalStorage(): Array<number> | null | undefined {
    return this.localStorageService.getItem('favorite');
  }

  public getFavoriteStateValue(): Observable<Array<number>> {
    return this.favoriteState$.asObservable();
  }

  public deleteFromFavorite(productId): void {
    const storageItem = this.localStorageService.getItem('favorite');
    const storageList = storageItem && Array.isArray(storageItem) ? storageItem : [];
    const deletedIndex = storageList.indexOf(productId)
    if(deletedIndex === -1) {
      return
    }
    storageList.splice(deletedIndex, 1);
    this.localStorageService.setItem('favorite', storageList);
    this.updateFavorite();
  }
}
