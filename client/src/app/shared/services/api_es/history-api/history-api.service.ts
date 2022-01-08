import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { ProductsPreviewI } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryApiService {

  private readonly apiUrl = 'api/user/history'
  constructor(
    private readonly http: TransferHttpService
  ) { }

  public getProductsHistory(): Observable<Array<ProductsPreviewI>>{
    return this.http.get(`${this.apiUrl}`);
  }
}
