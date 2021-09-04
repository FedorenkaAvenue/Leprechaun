import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProductCardDto, Products } from 'src/app/shared/models/product.model';
import { OverlayService } from 'src/app/shared/modules/modal/services/overlay.service';
import { ProductsService } from '../../sevices/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public products$: Observable<Products>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly overlayService: OverlayService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    ) { }

  ngOnInit(): void {
    this.productsService.init();
    this.getProducts();
    this.changeParams();
  }

  private getCategoryId(): string | null {
    return this.route.snapshot.paramMap.get('id')
  }

  private getProducts(): void {
    const id = this.getCategoryId();
    if(!id) {
      return;
    }
    const categoryId = Number(id)
    this.products$ = this.productsService.getProductsList(categoryId);
  }

  public changeParams(): void {
    this.route.queryParams.subscribe( params => {
      this.productsService.changeParams(params)
    }
    )
  }

  public deleteProducts(id: number): void {
    this.overlayService.open(
      ConfirmationDialogComponent,
      {}
    ).afterClosed$.pipe(
      take(1),
      switchMap((res) => {
        if(res.data) {
          return this.productsService.deleteProduct(id);
        }
        return EMPTY
      },
      )
    ).subscribe(res => {
      this.toastr.success('product was deleted');
     this.productsService.updateProducts();
    }
    )
  }

  public changePage(page: number): void {
    this.navigateToRouteWithParams({page})
  }

  public navigateToRouteWithParams(params: Params): void {
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge'});
  }
}
