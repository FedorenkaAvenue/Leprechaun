import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteDto } from '@shared/models';
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

  public getProducts(): Observable<FavoriteDto[]> {
    return this.userService.userSatate$.pipe(map(res => {
      console.log(res.wishlist);
      return res.wishlist;
    }))
  }

  public addProductToFavorites(id: string): Observable<FavoriteDto> {
    return this.http.post<FavoriteDto>(`${this.apiUrl}/${id}`, null)
  }

  public deleteProductFromFavorites(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  public clearAllProductsFromFavorites(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`);
  }
}
