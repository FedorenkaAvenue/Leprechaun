import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsPreviewI } from '@shared/models';
import { environment } from 'environments/environment.global';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/history/product`;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getProductsHistory(): Observable<Array<ProductsPreviewI>>{
    return this.http.get<Array<ProductsPreviewI>>(`${this.apiUrl}`);
  }

  public clearProductHistory(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`);
  }
}
