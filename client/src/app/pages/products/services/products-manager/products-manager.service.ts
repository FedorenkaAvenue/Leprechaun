import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Products } from '@shared/models';
import { CardStateService } from '@shared/services/card/card-state/card-state.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductsManagerService {

  public products$: Observable<Products>;
  constructor(
    private readonly productsService: ProductsService,
    private readonly cardService: CardStateService,
    ) { }


  public changeParams(params:  Params): void {
    this.productsService.changeParams(params);
  }

  public init(): void {
    this.productsService.init();
  }

  public destroy(): void {
    this.productsService.destroy();
  }

  public getProducts(): Observable<Products> {
    const cardState$ = this.cardService.getCardStateValue();
    const products$ = this.productsService.getProducts();
    return combineLatest([cardState$, products$]).pipe(
      map(([cardValue, products]) => {
        products.data.map(el => {
          const orderProducts = cardValue?.list.map(orderProduct => orderProduct?.product?.id);
          el.inCard = orderProducts?.includes(el.id);
          return el;
        })
        return products
      })
    )
    
    
    this.productsService.getProducts();
  }
}
