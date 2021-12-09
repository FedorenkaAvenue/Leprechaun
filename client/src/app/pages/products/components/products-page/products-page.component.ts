import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductCardDto, Products } from '@shared/models/products/products.model';
import { Observable } from 'rxjs';
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
  public myCustomControl = new FormControl();
  constructor(
    private readonly productsService: ProductsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.productsService.init();
  }

  ngOnInit(): void {
    this.productsList$ = this.productsService.getProducts();
    this.changeParams();
  }

  public changeSorting(order) {
    console.log(order); 
  }
  public changeParams(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      
      this.productsService.changeParams(params);
    });
  }

  public changePage(page: number): void {
    this.navigateToRouteWithParams({ page });
  }

  public navigateToRouteWithParams(params: Params): void {
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'});
  }
}
