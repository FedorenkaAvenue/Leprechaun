import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FavoritesDto, OrderDto } from '@shared/models';
import { CartService } from '@shared/services/cart/cart/cart.service';
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
    private readonly cartService: CartService,
    private readonly lpchRouterService: LpchRouterService,
  ) { }

  ngOnInit(): void {
    this.favoritesData$ = this.favoritesService.getProducts()
    this.favoritesData$.subscribe(res => { 
      console.log(res);
      
    })
  }

  public addToCart(productId: string): void {
    const productinCart = this.cartService.checkAvailabilityInCart(productId);
    if(productinCart) {
      this.lpchRouterService.navigateToCart();
      return
    }
    this.cartService.addToCart(productId).subscribe((order: OrderDto) => {
      this.cartService.updateCart(order);
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
