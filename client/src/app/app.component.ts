import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FavoritesDto } from '@shared/models';
import { OrderDto } from '@shared/models/products/order.model';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly meta: MetaService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,

    ) {
    this.meta.setTag('og:title', 'home ctor');
  }

  ngOnInit(): void {
    this.getCardState();
    this.getFavoritesState();
  }

  private getCardState(): void {
    this.cartService.getProducts().pipe(
      take(1),
    ).subscribe((order: OrderDto) => {
      this.cartService.updateCart(order);
    })
  }

  private getFavoritesState(): void {
    this.favoritesService.getProducts().pipe(
      take(1),
    ).subscribe((favorites: Array<FavoritesDto>) => {
      this.favoritesService.updateFavorites(favorites);
    })
  }
}
