import { Injectable } from '@angular/core';

import { LocalStorageService } from '@shared/storage/local.storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardStateService {

  private cardState$: BehaviorSubject<Array<number>>;


  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    const cardValue = this.localStorageService.getItem<Array<number>>('card') || [];
    this.cardState$ = new BehaviorSubject<Array<number>>(cardValue);
  }

  public updateCard(): void {
    const value = this.getCardValueFromLocalStorage() || [];
    this.cardState$.next(value);
  }

  public addToCard(productId): void {
    const storageItem = this.localStorageService.getItem('card');
    const storageList = storageItem && Array.isArray(storageItem) ? storageItem : [];
    if(storageList.includes(productId)) {
      return
    }
    storageList.push(productId);
    this.localStorageService.setItem('card', storageList);
    this.updateCard();
  }

  public getCardValueFromLocalStorage(): Array<number> | null | undefined {
    return this.localStorageService.getItem('card');
  }

  public getCardStateValue(): Observable<Array<number>> {
    return this.cardState$.asObservable();
  }

  public deleteFromCard(productId): void {
    const storageItem = this.localStorageService.getItem('card');
    const storageList = storageItem && Array.isArray(storageItem) ? storageItem : [];
    const deletedIndex = storageList.indexOf(productId)
    if(deletedIndex === -1) {
      return
    }
    storageList.splice(deletedIndex, 1);
    this.localStorageService.setItem('card', storageList);
    this.updateCard();
  }
}
