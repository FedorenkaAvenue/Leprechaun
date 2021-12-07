import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { SelectionProductType } from '@shared/enums';
import { ProductCardDto, ProductsCommonI } from '@shared/models';
import { PRODUCTS_NEW } from 'app/mock/products-selections';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class HomeApiService {

  private readonly apiUrl = 'api/product'
  
  constructor(
    private readonly http: TransferHttpService
    ) { }

    public getSelectionProducts(): Observable<ProductsCommonI> {
      return this.http.get<ProductsCommonI>(`${this.apiUrl}/dashboard/common`)
      // .pipe(
      //   catchError( () => {
      //     return of(PRODUCTS_NEW)
      //   })
      // )
    }
}
