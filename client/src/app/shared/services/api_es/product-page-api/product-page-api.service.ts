import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { ProductDetailsI } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPageApiService {

  private readonly apiUrl = 'api/product';
  constructor(
    private readonly http: TransferHttpService
  ) { }

  public getProduct(id: string): Observable<ProductDetailsI> {
    return this.http.get<ProductDetailsI>(`${this.apiUrl}/${id}`)
  }
}
