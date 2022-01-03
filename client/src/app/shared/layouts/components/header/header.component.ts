import { Component, OnInit } from '@angular/core';
import { OrderCardItemDto, OrderDto } from '@shared/models/products/order.model';
import { LANGUAGES } from '@shared/static/languages';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
import { FavoritesStateService } from '@shared/services/favorite/favorite-state/favorites-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cardValue$: Observable<string[]>
  public favoriteValue$: Observable<Array<string>>
  public languages = LANGUAGES;
  constructor(
    private readonly cardStateService: CardStateService,
    private readonly favoritesStateService: FavoritesStateService) { }

  ngOnInit(): void {
    this.cardValue$ = this.cardStateService.getCardStateValue().pipe(
      map((order: OrderDto) => order?.list.map((product: OrderCardItemDto) => product?.id)
      )
    );
    this.favoriteValue$ = this.favoritesStateService.getFavoritesStateValue();
  }

}
