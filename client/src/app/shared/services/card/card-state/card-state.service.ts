import { Injectable } from '@angular/core';
import { OrderDto, OrderProductI } from '@shared/models/products/order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CardStateService {

  private cardState$: BehaviorSubject<OrderDto>;

  constructor() {
    this.cardState$ = new BehaviorSubject<OrderDto>(null);
  }

  public updateCard(order: OrderDto): void {
    // const value = order;
    this.cardState$.next(order);
  }

  // public addToCard(productId): void {
  //   const storageItem = this.localStorageService.getItem('card');
  //   const storageList = storageItem && Array.isArray(storageItem) ? storageItem : [];
  //   if(storageList.includes(productId)) {
  //     return
  //   }
  //   storageList.push(productId);
  //   this.localStorageService.setItem('card', storageList);
  //   this.updateCard();
  // }

  // public getCardValueFromLocalStorage(): Array<number> | null | undefined {
  //   return this.localStorageService.getItem('card');
  // }

  public getCardStateValue(): Observable<OrderDto> {
    return this.cardState$.asObservable();
  }

  // public deleteFromCard(productId): void {
  //   const storageItem = this.localStorageService.getItem('card');
  //   const storageList = storageItem && Array.isArray(storageItem) ? storageItem : [];
  //   const deletedIndex = storageList.indexOf(productId)
  //   if(deletedIndex === -1) {
  //     return
  //   }
  //   storageList.splice(deletedIndex, 1);
  //   this.localStorageService.setItem('card', storageList);
  //   this.updateCard();
  // }
}
