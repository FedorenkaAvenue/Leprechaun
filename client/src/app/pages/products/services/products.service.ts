import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ProductCardDto, Products } from '@shared/models/products/products.model';
import { ProductsApiService } from '@shared/services/products-api/products-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ProductsService {

  private changeParams$: BehaviorSubject<Params | null>;
  
  constructor(
    private readonly productsApiService: ProductsApiService
    ) { }

    public getProducts(): Observable<Products> {
      return this.changeParams$.pipe(
        switchMap( (param: Params) => {
          const params: Params = {
            page: 1,
            ...param
          }
          return this.productsApiService.getProducts(params);
        })
      )
      // return this.productsApiService.getProducts({});
    }

    public changeParams(params: Params) {
      console.log(params);
      
      this.changeParams$.next(params);
    }

    public init(): void {
      this.changeParams$ = new BehaviorSubject<Params | null>(null);
    }
  
    public destroy(): void {
      this.changeParams$.complete();
    }
}
