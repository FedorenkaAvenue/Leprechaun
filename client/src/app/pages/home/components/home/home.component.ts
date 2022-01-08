import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FavoritesDto, ProductsCommonI, ProductsPreviewI } from '@shared/models';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public products$: Observable<ProductsCommonI>;
  public historyProducts$: Observable<Array<ProductsPreviewI>>;
  constructor(
    private readonly homeService: HomeService,
    private readonly favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.products$ = this.getProducts();
    this.historyProducts$ = this.getHistoryProducts();
  }

  private getProducts(): Observable<ProductsCommonI> {
    return this.homeService.getSelectionProducts();
  }

  private getHistoryProducts(): Observable<Array<ProductsPreviewI>> {
    return this.homeService.getHistoryProducts();
  }


  public addToFavorite(productId: string): void {
    this.favoritesService
      .addToFavorites(productId)
      .pipe(take(1))
      .subscribe((favorites: Array<FavoritesDto>) => {
        this.favoritesService.updateFavorites(favorites);
      });
  }

  public deleteFromFavorite(productId: string): void {
    this.favoritesService
      .deleteProduct(productId)
      .pipe(take(1))
      .subscribe((favorites: Array<FavoritesDto>) => {
        this.favoritesService.updateFavorites(favorites);
      });
  }
}
