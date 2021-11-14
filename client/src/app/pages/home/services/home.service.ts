import { Injectable } from '@angular/core';
import { SelectionProductType } from '@shared/enums';
import { ProductCardDto } from '@shared/models';
import { HomeApiService } from '@shared/services/api_es/home-api/home-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {
  constructor(private readonly homeApiService: HomeApiService) {}

  public getSelectionProducts(type: SelectionProductType, page: number): Observable<ProductCardDto[]> {
    return this.homeApiService.getSelectionProducts(type, page);
  }
}
