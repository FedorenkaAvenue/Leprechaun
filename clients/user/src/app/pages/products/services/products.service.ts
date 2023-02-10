import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ProductsSort } from '@shared/enums/sort.enum';
import { Products } from '@shared/models/products/products.model';
import { ProductsApiService } from '@shared/services/api_es/products-api/products-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ProductsService {

  private changeParams$: BehaviorSubject<Params | null>;
  
  constructor(
    private readonly productsApiService: ProductsApiService
    ) { }

    public getProducts(categoryId?: string): Observable<Products> {
      return this.changeParams$.pipe(
        switchMap( (param: Params) => {
          const params: Params = {
            page: 1,
            sort: ProductsSort.POPULAR,
            ...param
          }
          return this.productsApiService.getProducts(params, categoryId);
        })
      )
      // return this.productsApiService.getProducts({});
    }

    public getCategoryInfo(categoryUrl): Observable<any> {
      return this.productsApiService.getCategoryInfo(categoryUrl);
    }

    public changeParams(params: Params) {
      this.changeParams$.next(params);
    }

    public init(): void {
      this.changeParams$ = new BehaviorSubject<Params | null>(null);
    }
  
    public destroy(): void {
      this.changeParams$.complete();
    }
}
