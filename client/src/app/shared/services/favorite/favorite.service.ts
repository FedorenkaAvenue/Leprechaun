import { Injectable } from '@angular/core';
import { LocalStorageService } from '@shared/storage/local.storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteStateService {
  
  private favoriteState$: BehaviorSubject<Array<string>>;
  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    const favoriteValue = this.localStorageService.getItem<Array<string>>('favorite') || [];
    this.favoriteState$ = new BehaviorSubject<Array<string>>(favoriteValue);
  }

  public updateFavorite(): void {
    const value = this.getFavoriteValueFromLocalStorage() || [];
    this.favoriteState$.next(value);
  }

  public addToFavorite(productId): void {
    const storageItem = this.localStorageService.getItem('favorite');
    const storageList = storageItem && Array.isArray(storageItem) ? storageItem : [];
    const index = storageList.findIndex(el => el === productId);

    if(index == -1) {
      storageList.push(productId);
    } else {
      storageList.splice(index, 1);
    }
    
    this.localStorageService.setItem('favorite', storageList);
    this.updateFavorite();
  }

  public getFavoriteValueFromLocalStorage(): Array<string> | null | undefined {
    return this.localStorageService.getItem('favorite');
  }

  public getFavoriteStateValue(): Observable<Array<string>> {
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
