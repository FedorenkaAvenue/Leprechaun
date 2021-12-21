import { Injectable } from '@angular/core';
import { CardItemDto } from '@shared/models';
import { FavoritesApiService } from '@shared/services/api_es/favorites-api/favorites-api.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class FavoritesPageService {

  constructor(
    private readonly favoritesApiService: FavoritesApiService
  ) { }

  public getProducts(params: number[]): Observable<CardItemDto[]> {
    if(!params?.length) {
      return of([])
    }
     return this.favoritesApiService.getProducts(params)
   }
}
