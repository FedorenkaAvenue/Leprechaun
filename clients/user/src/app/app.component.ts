import { Component, OnInit } from '@angular/core';
// import { MetaService } from '@ngx-meta/core';
import { FavoritesDto, OrderDto } from '@shared/models';
import { UserI } from '@shared/models/user/user.model';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { UserService } from '@shared/services/user/user.service';
import { Observable } from 'rxjs';
// import { UserService } from '@shared/services/user/user/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    // private readonly meta: MetaService,
    private readonly cartService: CartService,
    private readonly favoritesService: FavoritesService,
    private readonly userService: UserService,

    ) {
    // this.meta.setTag('og:title', 'home ctor');
  }

  ngOnInit(): void {
    this.getUserState()
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


private getUserState(): void {
  this.userService.getUser();
  this.userService.userSatate$.subscribe((user: UserI) => {
    // const cartValue = new OrderDto(user.cart)
    // this.cartService.updateCart(cartValue)
    // const wishlistValue = 
    // this.favoritesService.updateFavorites(user.wishlist);
  })
}
}