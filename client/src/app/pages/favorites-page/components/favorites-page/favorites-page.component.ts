import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardItemDto } from '@shared/models';
import { FavoriteStateService } from '@shared/services/favorite/favorite.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FavoritesPageService } from '../../services/favorites-page.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPageComponent implements OnInit {

  public products$: Observable<CardItemDto[]>;
  constructor(
    private readonly favoritesPageService: FavoritesPageService,
    private readonly favoriteStateService: FavoriteStateService
  ) { }

  ngOnInit(): void {
    this.products$ = this.favoriteStateService.getFavoriteStateValue().pipe(
      switchMap(productsId => {
        return this.favoritesPageService.getProducts(productsId)
      })
    );
  }

  public deleteFromFavorites(id: number): void {
    this.favoriteStateService.deleteFromFavorite(id)
  }

}
