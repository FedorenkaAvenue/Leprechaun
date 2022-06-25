import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { ProductsService } from 'src/app/pages/product/sevices/products.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { Products } from 'src/app/shared/models/product.model';
import { OverlayService } from 'src/app/shared/modules/modal/services/overlay.service';
import { CategoriesService } from '../../services/categories.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-category-personal-page',
  templateUrl: './category-personal-page.component.html',
  styleUrls: ['./category-personal-page.component.scss']
})
export class CategoryPersonalPageComponent implements OnInit {

  public category$: Observable<CategoryDto>;
  public products$: Observable<Products>;

  private categoryUrl: string;
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
     private readonly overlayService: OverlayService,
     private readonly toastr: ToastrService,
     private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryUrl = this.getCategoryUrl();
    this.category$ = this.getCategory(this.categoryUrl);

    this.productsService.init();
    this.getProducts();
    this.changeParams();
    
    this.products$.subscribe(res => {
      console.log(res);
      
    })
  }

  private getCategory(url: string): Observable<CategoryDto> {
    return this.categoriesService.getCategoryByUrl(url);
  }

  private getProducts(): void {
    if(!this.categoryUrl) {
      return;
    }
    this.products$ = this.productsService.getProductsList(this.categoryUrl);
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

  private getCategoryUrl(): string {
    return this.route.snapshot.paramMap.get('url') || ''
  }

  
}
