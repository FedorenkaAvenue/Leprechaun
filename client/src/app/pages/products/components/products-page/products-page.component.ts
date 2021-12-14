import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Products } from '@shared/models/products/products.model';
import { CardStateService } from '@shared/services/card/card-state.service';
import { FavoriteService } from '@shared/services/favorite/favorite.service';
import { Observable } from 'rxjs';
import { ProductsManagerService } from '../../services/products-manager/products-manager.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  public productsCount = 1019;
  public productsList$: Observable<Products>;
  public myCustomControl = new FormControl();
  constructor(
    private readonly productsManagerService: ProductsManagerService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cardService: CardStateService,
    private readonly favoriteService: FavoriteService,
  ) {
    this.productsManagerService.init();
  }

  ngOnInit(): void {
    this.productsList$ = this.productsManagerService.getProducts();
    this.changeParams();
  }

  ngOnDestroy() {
    this.productsManagerService.destroy();
  }
  public changeSorting(order) {
  }
  public changeParams(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      
      this.productsManagerService.changeParams(params);
    });
  }

  public changePage(page: number): void {
    this.navigateToRouteWithParams({ page });
  }

  public navigateToRouteWithParams(params: Params): void {
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'});
  }

  public addToCard(productId): void {
    this.cardService.addToCard(productId)
  }

  public addToFavorite(productId): void {
    this.favoriteService.addToFavorite(productId)
  }
}
