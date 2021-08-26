import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { ProductCardDto, Products } from '@shared/models/products/products.model';;
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  private readonly apiUrl = 'api/product'
  constructor(
    private readonly http: TransferHttpService
  ) { }

  public getProducts(data: any): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/list`)
  }
}
