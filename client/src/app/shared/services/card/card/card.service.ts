import { Injectable } from '@angular/core';
import { CustomerData, OrderDto, OrderI } from '@shared/models/products/order.model';
import { CardApiService } from '@shared/services/api_es/card-api/card-api.service';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CardStateService } from '../card-state/card-state.service';

@Injectable()
export class CardService {

  private cardValue$: BehaviorSubject<OrderDto>;

  constructor(
    private readonly cardApiService: CardApiService,
    private readonly cardStateService: CardStateService,
    ) {
    this.cardValue$ = new BehaviorSubject<OrderDto>(null); 
  }

  public getCardValue(): Observable<OrderDto> {
    return this.cardValue$.asObservable();
  }
  
  public getProducts(): Observable<OrderDto> {
    const products = this.cardApiService.getProducts()
    return merge(products, this.cardValue$).pipe(filter(res => !!res))
  }

  public addToCard(id: string): Observable<OrderI> {
    return this.cardApiService.addProductToCard(id)
  }

  public deleteProduct(id: string): Observable<OrderI> {
    return this.cardApiService.deleteProductFromCard(id)
  }

  public updateCard(order: OrderDto): void {
    this.cardValue$.next(order);
    this.cardStateService.updateCard(order);
  }

  public sendOrder(order: OrderDto, customerData: CustomerData): Observable<any> {
    return this.cardApiService.sendOrder(order, customerData)
  }

  public checkAvailabilityInCard(id: string): boolean {
    const cardIds = this.cardValue$.value?.list.map(orderProduct => orderProduct?.product?.id);
    const productInCard = (cardIds || []).includes(id);
    return productInCard;
  }
}
