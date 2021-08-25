import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { ProductCardDto } from '@shared/models/products/products.model';
import { PRODUCTS_LIST } from 'app/mock/products';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  private readonly apiUrl = 'someApi'
  constructor(
    private readonly http: TransferHttpService
  ) { }

  public getProducts(data: any): Observable<ProductCardDto[]> {
    return this.http.get<ProductCardDto[]>('someApi').pipe(
      catchError(() => {
        return of(PRODUCTS_LIST)
      })
    )
  }
}
