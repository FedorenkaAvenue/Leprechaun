import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerData, OrderDto, OrderI, ProductAmountPayload } from '@shared/models/products/order.model';
import { UserService } from '@shared/services/user/user.service';
import { environment } from 'environments/environment.global';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Injectable()
export class CartApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/order`;
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
    ) {}

  public getProducts(): Observable<OrderDto> {
    return this.http.get<OrderI>(`${this.apiUrl}`);
  }

  public addProductToCart(product: string): Observable<OrderI> {
    return this.http.post<OrderI>(`${this.apiUrl}/item`, { product });
  }

  public deleteProductFromCart(id: string): Observable<OrderI> {
    return this.http.delete<OrderI>(`${this.apiUrl}/item/${id}`);
  }

  public setProductAmount(data: ProductAmountPayload): Observable<OrderI> {
    return this.http.patch<OrderI>(`${this.apiUrl}/item`, data)
  }

  public sendOrder(order: OrderDto, customer: CustomerData): Observable<any> {
    const data = {order, customer}
    return this.http.post(`${this.apiUrl}`, data)
  }
}
