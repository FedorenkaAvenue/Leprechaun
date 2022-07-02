import { Component, OnInit } from '@angular/core';
import { OrderCartItemDto, OrderDto } from '@shared/models/products/order.model';
import { LANGUAGES } from '@shared/static/languages';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartStateService } from '@shared/services/cart/cart-state/cart-state.service';
import { FavoritesStateService } from '@shared/services/favorite/favorite-state/favorites-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cartValue$: Observable<string[]>
  public favoriteValue$: Observable<Array<string>>
  public languages = LANGUAGES;
  constructor(
    private readonly cartStateService: CartStateService,
    private readonly favoritesStateService: FavoritesStateService) { }

  ngOnInit(): void {
    this.cartValue$ = this.cartStateService.getCartStateValue().pipe(
      map((order: OrderDto) => order?.list.map((product: OrderCartItemDto) => product?.id)
      )
    );
    this.favoriteValue$ = this.favoritesStateService.getFavoritesStateValue();
  }

}
