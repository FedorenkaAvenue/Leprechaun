import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.global';
import {
  ProductCardDto,
  ProductPayloadDto,
  Products,
} from '../../models/product.model';
import { objectToFormData } from '../../utils/object-to-form-data';

@Injectable()
export class ProductsApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}`;

  constructor(private readonly http: HttpClient) {}

  getProductsList(url: string, param: Params): Observable<Products> {
    const params = new HttpParams().set('page', param.page);
    return this.http.get<Products>(
      `${this.apiUrl}/adm/product/category/${url}`
      // , {params}
    );
  }
  

  public createProduct(data: ProductPayloadDto): Observable<any> {
    let formData = objectToFormData(data)
    // const formData = new FormData();

    // if (data.price_old) {
    //   formData.append('price_old', data.price_old?.toString());
    // }

    // formData.append('category', data.category?.toString()),
    //   formData.append('is_public', data.is_public?.toString()),
    //   formData.append('price_current', data.price_current?.toString()),
    //   formData.append('title[ua]', data.title.ua),
    //   formData.append('title[ru]', data.title.ru),
    //   formData.append('title[en]', data.title.en),
    //   formData.append('rating', data.rating),
    //   formData.append('is_new', data.is_new?.toString());

    // Object.keys(data.images).forEach((key: any) => {
    //   formData.append('images', data.images[key]);
    // });
    return this.http.post<any>(`${this.apiUrl}/adm/product`, formData);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/adm/product/${id}`);
  }
}
