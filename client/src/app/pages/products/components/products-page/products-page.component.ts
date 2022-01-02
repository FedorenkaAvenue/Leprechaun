import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderDto } from '@shared/models/products/order.model';
import { Products } from '@shared/models/products/products.model';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
import { CardService } from '@shared/services/card/card/card.service';
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
    private readonly cardService: CardService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cardStateService: CardStateService,
    private readonly cdr: ChangeDetectorRef
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
    console.log(order); 
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
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'});
  }

  public addToCard(productId): void {
    this.cardService.addToCard(productId).subscribe((order: OrderDto) => {
      // const cardList = order?.list?.map(cardItem => cardItem?.product?.id)
      this.cardService.updateCard(order);
    })
  }
}
