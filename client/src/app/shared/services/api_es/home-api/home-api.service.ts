import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { ProductsCommonI } from '@shared/models';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';


@Injectable()
export class HomeApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/product`;

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
