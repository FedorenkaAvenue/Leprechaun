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
    this.cardState$.next(order);
  }

  public getCardStateValue(): Observable<OrderDto> {
    return this.cardState$.asObservable();
  }
}
