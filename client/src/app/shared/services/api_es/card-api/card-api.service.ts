import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { CardItemDto, Products } from '@shared/models';
import { arrayToString } from '@shared/utils/transformers';
import { Observable } from 'rxjs';

@Injectable()
export class CardApiService {

  private readonly apiUrl = 'api/product/preview';
  constructor(
    private readonly http: TransferHttpService
    ) { }
    
    public getProducts(param: number[]): Observable<CardItemDto[]> {
      const convertedParams = arrayToString(param, ';');
      const params = new HttpParams().set('ids', convertedParams);
    return this.http.get<CardItemDto[]>(`${this.apiUrl}/list`, {params})
  }
}
