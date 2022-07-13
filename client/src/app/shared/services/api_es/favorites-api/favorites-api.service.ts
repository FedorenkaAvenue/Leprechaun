import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
// import { CardItemDto } from '@shared/models';
import { arrayToString } from '@shared/utils/transformers';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/wishlist`;

  constructor(private readonly http: TransferHttpService) {}

  public getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  public addProductToFavorites(id: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${id}`, null)
  }

  public deleteProductFromFavorites(id: string): Observable<any[]> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
