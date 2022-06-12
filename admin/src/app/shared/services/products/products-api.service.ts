import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PRODUCTS_LIST } from 'src/app/mock/product';
import { environment } from 'src/environments/environment';
import { ProductCardDto, ProductPayloadDto, Products } from '../../models/product.model';

@Injectable()
export class ProductsApiService {

  private readonly apiUrl = `${environment?.apiEndpoint}`;

  constructor(
    private readonly http: HttpClient
  ) { }

  getProductsList(url: string, param: Params): Observable<Products> {
    const params = new HttpParams().set('page', param.page);
    return this.http.get<Products>(`${this.apiUrl}/adm/product/category/${url}`
    // , {params}
    )
  }

  public createProduct(data: ProductPayloadDto): Observable<any> {

    const formData  = new FormData();
    formData.append('category', data.category?.toString()), 
    formData.append('is_public', data.is_public?.toString()),
    formData.append('price_current', data.price_current?.toString()),
    formData.append('title', data.title),
    Object.keys(data.images).forEach((key: any) => {
        formData.append('images', data.images[key])
      });
    return this.http.post<any>(`${this.apiUrl}/adm/product`, formData)
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/adm/product/${id}`)
  }
}
