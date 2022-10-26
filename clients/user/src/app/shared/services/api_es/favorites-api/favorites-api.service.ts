import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-universal';
import { UserService } from '@shared/services/user/user.service';
// import { CardItemDto } from '@shared/models';
import { arrayToString } from '@shared/utils/transformers';
import { environment } from 'environments/environment.global';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesApiService {
  private readonly apiUrl = `${environment?.apiEndpoint}/wishlist`;

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
    ) {}

  public getProducts(): Observable<any[]> {
    return this.userService.userSatate$.pipe(map(res => res.wishlist))
  }

  public addProductToFavorites(id: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${id}`, null)
  }

  public deleteProductFromFavorites(id: string): Observable<any[]> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
