import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FavoritesDto, DasboardCommonProductsI, ProductsPreviewI, DasboardUserProductsI } from '@shared/models';
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
  public dasboardCommonProducts$: Observable<DasboardCommonProductsI>;
  public dasboardUserProducts$: Observable<DasboardUserProductsI>;
  constructor(
    private readonly homeService: HomeService,
    private readonly favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.dasboardCommonProducts$ = this.getDasboardCommonProducts();
    this.dasboardUserProducts$ = this.getDashboardUserProducts();
  }

  private getDasboardCommonProducts(): Observable<DasboardCommonProductsI> {
    return this.homeService.getSelectionProducts();
  }

  private getDashboardUserProducts(): Observable<DasboardUserProductsI> {
    return this.homeService.getUserSelectionProducts();
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
