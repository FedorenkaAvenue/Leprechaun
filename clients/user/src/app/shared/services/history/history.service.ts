import { Injectable } from '@angular/core';
import { ProductCardI, ProductsPreviewI } from '@shared/models';
import { Observable } from 'rxjs';
import { HistoryApiService } from '../api_es/history-api/history-api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
  private readonly historyApiService: HistoryApiService
  ) { }

  public getHistoryProducts(): Observable<Array<ProductsPreviewI>> {
    return this.historyApiService.getProductsHistory();
  }

  // public getVieweProducts(): Observable<Array<ProductCardI>> {
  //   return this.historyApiService.getProductsHistory();
  // }

}
