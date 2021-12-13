import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { ProductsCommonI } from '@shared/models';
import { Observable, of } from 'rxjs';


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
