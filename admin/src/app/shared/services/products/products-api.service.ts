import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PRODUCTS_LIST } from 'src/app/mock/product';
import { ProductCardDto, Products } from '../../models/product.model';

@Injectable()
export class ProductsApiService {

  private readonly apiUrl = 'api'
  constructor(
    private readonly http: HttpClient
  ) { }

  getProductsList(url: string): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/category/products/${url}`)
  }

  public createProduct(data: any): Observable<any> {
    const formData  = new FormData();
    formData.append('category', data.category),
    formData.append('isPublic', data.isPublic),
    formData.append('price', data.price),
    formData.append('title', data.title),
    Object.keys(data.images).forEach((key: any) => {
        formData.append('images', data.images[key])
      });
    return this.http.post<any>(`${this.apiUrl}/product`, formData)
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/${id}`)
  }
}
