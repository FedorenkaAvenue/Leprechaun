import { Injectable } from '@angular/core';
import { OrderI } from '@shared/models/products/order.model';
import { OrdersApiService } from '@shared/services/api_es/orders-api/orders-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class CabinetOrdersService {

  constructor(private readonly ordersApiService: OrdersApiService) { }


  public getOrderHistory(): Observable<Array<OrderI>> {
    return this.ordersApiService.getOrdersHistory()
  }
}
