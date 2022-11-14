import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderI } from '@shared/models';
import { ORDERS_HISTORY } from 'app/mock/orders';
import { environment } from 'environments/environment.global';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/order/list`;

  constructor(private readonly http: HttpClient) {}

  public getOrdersHistory(): Observable<Array<OrderI>> {
    console.log('order api');
    
    return this.http.get<Array<OrderI>>(`${this.apiUrl}`)
    .pipe(
      // map((res) => ORDERS_HISTORY),
      catchError(() => of(ORDERS_HISTORY)),
    );
  }
}
