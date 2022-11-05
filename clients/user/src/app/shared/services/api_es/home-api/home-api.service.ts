import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DasboardCommonProductsI, DasboardUserProductsI } from '@shared/models';
import { environment } from 'environments/environment.global';
import { Observable, of } from 'rxjs';


@Injectable()
export class HomeApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/product`;

  constructor(
    private readonly http: HttpClient
    ) { }

    public getSelectionProducts(): Observable<DasboardCommonProductsI> {
      return this.http.get<DasboardCommonProductsI>(`${this.apiUrl}/dashboard/common`)
      // .pipe(
      //   catchError( () => {
      //     return of(PRODUCTS_NEW)
      //   })
      // )
    }

    public getUserSelectionProducts(): Observable<DasboardUserProductsI> {
      return this.http.get<DasboardUserProductsI>(`${this.apiUrl}/dashboard/user`)
      // .pipe(
      //   catchError( () => {
      //     return of(PRODUCTS_NEW)
      //   })
      // )
    }

}
