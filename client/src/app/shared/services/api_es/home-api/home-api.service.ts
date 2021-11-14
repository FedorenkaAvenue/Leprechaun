import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { SelectionProductType } from '@shared/enums';
import { ProductCardDto } from '@shared/models';
import { Observable } from 'rxjs';



@Injectable()
export class HomeApiService {

  private readonly apiUrl = 'api/product'
  
  constructor(
    private readonly http: TransferHttpService
    ) { }

    public getSelectionProducts(type: SelectionProductType, page: number): Observable<ProductCardDto[]> {
      return this.http.get(`${this.apiUrl}/dashboard/${type}/${page}`)
    }
}
