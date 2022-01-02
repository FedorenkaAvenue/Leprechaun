import { Injectable } from '@angular/core';
import { CardItemDto } from '@shared/models';
import { OrderDto, OrderI } from '@shared/models/products/order.model';
import { CardApiService } from '@shared/services/api_es/card-api/card-api.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class CardPageService {

  constructor(private readonly cardApiService: CardApiService) { }

  public getProducts(): Observable<OrderDto> {
    return this.cardApiService.getProducts()
  }

  public addToCard(id: string): Observable<OrderI> {
    return this.cardApiService.addProductToCard(id)
  }

  public deleteProduct(id: string): Observable<OrderI> {
    return this.cardApiService.deleteProductFromCard(id)
  }
}
