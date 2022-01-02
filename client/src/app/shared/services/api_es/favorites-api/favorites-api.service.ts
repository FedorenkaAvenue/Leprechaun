import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
// import { CardItemDto } from '@shared/models';
import { arrayToString } from '@shared/utils/transformers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesApiService {
  private readonly apiUrl = 'api/product/preview';

  constructor(private readonly http: TransferHttpService) {}

  public getProducts(param: string[]): Observable<any[]> {
    const convertedParams = arrayToString(param, ';');
    const params = new HttpParams().set('ids', convertedParams);
    return this.http.get<any[]>(`${this.apiUrl}/list`, { params });
  }
}
