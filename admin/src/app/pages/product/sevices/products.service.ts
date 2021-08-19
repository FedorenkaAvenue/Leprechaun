import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { ProductCardDto } from 'src/app/shared/models/product.model';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';
import { ProductsApiService } from 'src/app/shared/services/products/products-api.service';

@Injectable()
export class ProductsService {

  private updateProducts$: Subject<void>;
  // productsList$: Observable<ProductCardDto[]>;

  constructor(
    private readonly productsApiService: ProductsApiService,
    private readonly categoriesApiService: CategoriesApiService
    ) { }

  public getProductsList(url: string): Observable<ProductCardDto[]> {
    return this.updateProducts$.pipe(
      startWith(null),
      switchMap( res => this.productsApiService.getProductsList(url))
    )
  }

  public createProduct(data: any): Observable<any> {
    return this.productsApiService.createProduct(data)
  }

  public getCategories(): Observable<CategoryDto[]> {
    return this.categoriesApiService.getCategories()
  }

  public deleteProduct(id: number): Observable<any> {
    return this.productsApiService.deleteProduct(id)
  }

  public updateProducts(): void {
    this.updateProducts$.next();
  }

  public init(): void {
    this.updateProducts$ = new Subject();
  }

  public destroy(): void {
    this.updateProducts$.complete();
  }
}
