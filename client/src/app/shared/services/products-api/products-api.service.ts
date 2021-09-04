import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
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

  public getProducts(param: Params): Observable<Products> {
    console.log(param);
    const params = new HttpParams().set('page', param.page);
    return this.http.get<Products>(`${this.apiUrl}/list`, {params})
  }
}
