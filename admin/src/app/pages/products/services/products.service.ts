import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Products } from 'src/app/shared/models/product.model';
import { ProductsApiService } from 'src/app/shared/services/products/products-api.service';

@Injectable()
export class ProductsService {
  private changeParams$: BehaviorSubject<Params>;

  constructor(private readonly productsApiService: ProductsApiService) {}

  public getProducts(): Observable<Products> {
    return this.changeParams$.pipe(
      switchMap((param: Params) => {
          return this.productsApiService.getProductsList('', param)
      })
    );
    return this.productsApiService.getProductsList('', {});
    //   return this.changeParams$.pipe(
    // switchMap( (param: Params) => {
    //   const params: Params = {
    //     // page: 1,
    //     // sort: ProductsSort.POPULAR,
    //     // ...param
    //   }

    // }
    //     )
    //   )
  }

  public changeParams(params: Params) {
    this.changeParams$.next(params);
  }

  public init(): void {
    this.changeParams$ = new BehaviorSubject<Params>({});
  }

  public destroy(): void {
    this.changeParams$.complete();
  }
}
