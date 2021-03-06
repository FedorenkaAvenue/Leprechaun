import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProductCardDto, Products } from 'src/app/shared/models/product.model';
import { OverlayService } from 'src/app/shared/modules/modal/services/overlay.service';
import { ProductsService } from '../../../product/sevices/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  public products$: Observable<Products>;
  constructor(
    private readonly route: ActivatedRoute,
    // private readonly productsService: ProductsService,
    private readonly overlayService: OverlayService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    ) { }

  ngOnInit(): void {
    // this.productsService.init();
    // this.getProducts();
    // this.changeParams();
  }

  // private getCategoryUrl(): string | null {
  //   return this.route.snapshot.paramMap.get('url')
  // }

  // private getProducts(): void {
  //   const url = this.getCategoryUrl();
  //   if(!url) {
  //     return;
  //   }
  //   this.products$ = this.productsService.getProductsList(url);
  // }

  // public changeParams(): void {
  //   this.route.queryParams.subscribe( params => {
  //     this.productsService.changeParams(params)
  //   }
  //   )
  // }

  // public deleteProducts(id: number): void {
  //   this.overlayService.open(
  //     ConfirmationDialogComponent,
  //     {}
  //   ).afterClosed$.pipe(
  //     take(1),
  //     switchMap((res) => {
  //       if(res.data) {
  //         return this.productsService.deleteProduct(id);
  //       }
  //       return EMPTY
  //     },
  //     )
  //   ).subscribe(res => {
  //     this.toastr.success('product was deleted');
  //    this.productsService.updateProducts();
  //   }
  //   )
  // }

  // public changePage(page: number): void {
  //   this.navigateToRouteWithParams({page})
  // }

  // public navigateToRouteWithParams(params: Params): void {
  //   this.router.navigate(['.'], {relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'});
  // }
}
