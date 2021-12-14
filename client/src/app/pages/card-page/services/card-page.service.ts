import { Injectable } from '@angular/core';
import { CardItemDto } from '@shared/models';
import { CardApiService } from '@shared/services/api_es/card-api/card-api.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class CardPageService {

  constructor(private readonly cardApiService: CardApiService) { }

  public getProducts(params: number[]): Observable<CardItemDto[]> {
   if(!params?.length) {
     return of([])
   }
    return this.cardApiService.getProducts(params)
  }
}
