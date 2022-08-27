import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { arrayToString } from '@shared/utils/transformers';
import { WISHLIST_PRODUCTS } from 'app/mock/products-wishlist';
import { environment } from 'environments/environment.global';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoritesApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/wishlist`;

  constructor(private readonly http: TransferHttpService) {}

  public getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(catchError(() => of(WISHLIST_PRODUCTS)));
  }

  public addProductToFavorites(id: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${id}`, null);
  }

  public deleteProductFromFavorites(id: string): Observable<any[]> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
