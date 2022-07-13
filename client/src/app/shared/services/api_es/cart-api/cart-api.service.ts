import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { CustomerData, OrderDto, OrderI, ProductAmountPayload } from '@shared/models/products/order.model';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CartApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/order`;
  constructor(private readonly http: TransferHttpService) {}

  public getProducts(): Observable<OrderDto> {
    return this.http.get(`${this.apiUrl}`).pipe(
      map((res: OrderDto) => new OrderDto(res)),
      catchError(() => of(null)) );
  }

  public addProductToCart(product: string): Observable<OrderI> {
    return this.http.post(`${this.apiUrl}/item`, { product });
  }

  public deleteProductFromCart(id: string): Observable<OrderI> {
    return this.http.delete(`${this.apiUrl}/item/${id}`);
  }

  public setProductAmount(data: ProductAmountPayload): Observable<OrderI> {
    return this.http.patch(`${this.apiUrl}/item`, data)
  }

  public sendOrder(order: OrderDto, customer: CustomerData): Observable<any> {
    const data = {order, customer}
    return this.http.post(`${this.apiUrl}`, data)
  }
}
