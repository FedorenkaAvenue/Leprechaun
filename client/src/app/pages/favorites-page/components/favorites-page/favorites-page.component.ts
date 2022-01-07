import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FavoritesDto } from '@shared/models';
import { OrderDto } from '@shared/models/products/order.model';
import { CardService } from '@shared/services/card/card/card.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { LpchRouterService } from '@shared/services/router/lpch-router.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPageComponent implements OnInit {

  public favoritesData$: Observable<FavoritesDto[]>;
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly cardService: CardService,
    private readonly lpchRouterService: LpchRouterService,
  ) { }

  ngOnInit(): void {
    this.favoritesData$ = this.favoritesService.getProducts()
  }

  public addToCard(productId: string): void {
    const productInCard = this.cardService.checkAvailabilityInCard(productId);
    if(productInCard) {
      this.lpchRouterService.navigateToCard();
      return
    }
    this.cardService.addToCard(productId).subscribe((order: OrderDto) => {
      this.cardService.updateCard(order);
    })
  }

  public deleteFromFavorite(productId: string): void {
    this.favoritesService.deleteProduct(productId)
    .pipe(take(1))
    .subscribe((favorites: FavoritesDto[]) => {
      this.favoritesService.updateFavorites(favorites);
    })
  }
  
}
