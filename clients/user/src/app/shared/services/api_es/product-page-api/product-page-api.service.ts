import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { ProductDetailsI } from '@shared/models';
import { environment } from 'environments/environment.global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPageApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/product`;
  constructor(
    private readonly http: HttpClient
  ) { }

  public getProduct(id: string): Observable<ProductDetailsI> {
    return this.http.get<ProductDetailsI>(`${this.apiUrl}/${id}`)
  }
}
