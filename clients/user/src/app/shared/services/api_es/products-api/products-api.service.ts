import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Products } from '@shared/models/products/products.model';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/product`;
  private readonly categoryApiUrl = `${environment?.apiEndpoint}/category`;
  constructor(
    private readonly http: HttpClient
  ) { }

  public getProducts(param: Params, categoryId?: string): Observable<Products> { 
    const params = new HttpParams()
    .set('page', param.page)
    .set('sort', param.sort);
    const url = categoryId ? `category/${categoryId}` : `list`;
    return this.http.get<Products>(`${this.apiUrl}/${url}`, {params})
  }

public getCategoryList(): Observable<any> {
  return this.http.get<any>(`${this.categoryApiUrl}/list`)
}

public getCategoryInfo(categoryUrl): Observable<any> {
  return this.http.get<any>(`${this.categoryApiUrl}/${categoryUrl}`)
}
}
