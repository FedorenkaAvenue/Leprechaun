import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { CardItemDto } from '@shared/models';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
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

  public favoritesData$: Observable<any[]>;
  constructor(
    private readonly favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.favoritesData$ = this.favoritesService.getProducts()
  }

  public addToCard(productId): void {
    this.cardService.addToCard(productId).subscribe((order: OrderDto) => {
      // const cardList = order?.list?.map(cardItem => cardItem?.product?.id)
      this.cardService.updateCard(order);
    })
  }
  
}
