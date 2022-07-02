import { Injectable } from '@angular/core';
import { OrderDto, OrderProductI } from '@shared/models/products/order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CartStateService {

  private cartState$: BehaviorSubject<OrderDto>;

  constructor() {
    this.cartState$ = new BehaviorSubject<OrderDto>(null);
  }

  public updateCart(order: OrderDto): void {
    this.cartState$.next(order);
  }

  public getCartStateValue(): Observable<OrderDto> {
    return this.cartState$.asObservable();
  }
}
