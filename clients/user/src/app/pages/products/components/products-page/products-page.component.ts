import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderDto } from '@shared/models/products/order.model';
import { Products } from '@shared/models/products/products.model';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { Observable, of } from 'rxjs';
import { ProductsManagerService } from '../../services/products-manager/products-manager.service';
import { FavoritesService } from '@shared/services/favorite/favotite/favorites.service';
import { LpchRouterService } from '@shared/services/router/lpch-router.service';
import { FavoriteDto, FavoriteProductDto } from '@shared/models';
import { take } from 'rxjs/operators';
import { SORTING } from '@shared/constants/sorting';
import { ProductsSort } from '@shared/enums/sort.enum';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  public productsCount = 1019;
  public productsList$: Observable<Products>;
  public categoryData$: Observable<any>;
  public myCustomControl = new FormControl();
  public sortData = SORTING;
  public currentSortItem: number;
  constructor(
    private readonly productsManagerService: ProductsManagerService,
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly favoritesService: FavoritesService,
    private readonly lpchRouterService: LpchRouterService,
    private readonly productsService: ProductsService,
  ) {
    this.productsManagerService.init();
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params.id;
    this.categoryData$ = categoryId ? this.productsService.getCategoryInfo(categoryId) : of(null)
    this.productsList$ = this.productsManagerService.getProducts(categoryId);
    this.changeParams();
   const params = this.route.snapshot.queryParams;
   const sort = params ? params?.sort : null
   this.currentSortItem = +sort || ProductsSort.POPULAR;
  }

  ngOnDestroy() {
    this.productsManagerService.destroy();
  }

  public changeSorting(sort: number) {
    this.navigateToRouteWithParams({sort})
  }

  public changeParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.productsManagerService.changeParams(params);
    });
  }

  public changePage(page: number): void {
    this.navigateToRouteWithParams({ page });
  }

  public navigateToRouteWithParams(params: Params): void {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  public addToCart(productId: string): void {
    const productinCart = this.cartService.checkAvailabilityInCart(productId);
    if (productinCart) {
      this.lpchRouterService.navigateToCart();
      return;
    }
    this.cartService.addToCart(productId).subscribe((order: OrderDto) => {
      this.cartService.updateCart(order);
    });
  }

  public addToFavorite(productId: string): void {
    this.favoritesService
      .addToFavorites(productId)
      .pipe(take(1))
      .subscribe((favorites: FavoriteDto) => {
        this.favoritesService.addToFavoriteSore(favorites);
      });
  }

  public deleteFromFavorite(favoriteId: string): void {
    this.favoritesService.deleteProduct(favoriteId).subscribe((favorites: any) => {
    });
  }
}
