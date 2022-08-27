import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { OrderI, ProductsPreviewI } from '@shared/models';
import { ORDERS_HISTORY } from 'app/mock/orders';
import { environment } from 'environments/environment.global';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/order/history`;

  constructor(private readonly http: TransferHttpService) {}

  public getOrdersHistory(): Observable<Array<OrderI>> {
    return this.http.get(`${this.apiUrl}`).pipe(
      map((res) => ORDERS_HISTORY),
      catchError(() => of(ORDERS_HISTORY)),
    );
  }
}
