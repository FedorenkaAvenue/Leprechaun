import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import { ProductCardDto, Products } from 'src/app/shared/models/product.model';
import { CategoriesApiService } from 'src/app/shared/services/categories/categories-api.service';
import { ProductsApiService } from 'src/app/shared/services/products/products-api.service';

@Injectable()
export class ProductsService {
  private updateProducts$: Subject<void>;
  private changeParams$: BehaviorSubject<Params | null>;
  
  constructor(
    private readonly productsApiService: ProductsApiService,
    private readonly categoriesApiService: CategoriesApiService
  ) {}

  public getProductsList(url: string): Observable<Products> {
    return combineLatest([
      this.changeParams$,
      this.updateProducts$.pipe(startWith(null)),
    ]).pipe(
      switchMap(([params]) => {
        const param: Params = {
          page: 1,
          ...params,
        };
        return this.productsApiService.getProductsList(url, param);
      })
    );
  }

  public createProduct(data: any): Observable<any> {
    return this.productsApiService.createProduct(data);
  }

  public getCategories(): Observable<CategoryDto[]> {
    return this.categoriesApiService.getCategories();
  }

  public deleteProduct(id: number): Observable<any> {
    return this.productsApiService.deleteProduct(id);
  }

  public updateProducts(): void {
    this.updateProducts$.next();
  }

  public changeParams(params: Params) {
    this.changeParams$.next(params);
  }

  public init(): void {
    this.updateProducts$ = new Subject();
    this.changeParams$ = new BehaviorSubject<Params | null>(null);
  }

  public destroy(): void {
    this.updateProducts$.complete();
    this.changeParams$.complete();
  }
}
