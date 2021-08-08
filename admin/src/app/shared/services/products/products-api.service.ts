import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PRODUCTS_LIST } from 'src/app/mock/product';
import { ProductCardDto } from '../../models/product.model';

@Injectable()
export class ProductsApiService {

  private readonly apiUrl = 'api'
  constructor(
    private readonly http: HttpClient
  ) { }

  getProductsList(url: string): Observable<ProductCardDto[]> {
    return this.http.get<ProductCardDto[]>(`${this.apiUrl}/category/${url}/products`).pipe(
      catchError( () => {
        return of(PRODUCTS_LIST.map( el => {
          return new ProductCardDto(el)
        }))
      })
    )
  }

  public createProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product`, data)
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/${id}`)
  }
}
