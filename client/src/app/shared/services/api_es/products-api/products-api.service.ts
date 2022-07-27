import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { Products } from '@shared/models/products/products.model';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/product`;
  constructor(
    private readonly http: TransferHttpService
  ) { }

  public getProducts(param: Params): Observable<Products> {    
    const params = new HttpParams()
    .set('page', param.page)
    .set('sort', param.sort);
    
    return this.http.get<Products>(`${this.apiUrl}/list`, {params})
  }
}
