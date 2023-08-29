import { Injectable } from '@angular/core';
import { CustomerData, OrderDto, OrderI, ProductAmountPayload } from '@shared/models/products/order.model';
import { CartApiService } from '@shared/services/api_es/cart-api/cart-api.service';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CartStateService } from '../cart-state/cart-state.service';

@Injectable()
export class CartService {

  private cartValue$: BehaviorSubject<OrderDto>;

  constructor(
    private readonly cartApiService: CartApiService,
    private readonly cartStateService: CartStateService,
    ) {
    this.cartValue$ = new BehaviorSubject<OrderDto>(null); 
  }

  public getCartValue(): Observable<OrderDto> {
    return this.cartValue$.asObservable();
  }
  
  public getProducts(): Observable<OrderDto> {
    const products = this.cartApiService.getProducts()
    return merge(products, this.cartValue$).pipe(filter(res => !!res))
  }

  public addToCart(id: string): Observable<OrderI> {
    return this.cartApiService.addProductToCart(id)
  }

  public deleteProduct(id: string): Observable<OrderI> {
    return this.cartApiService.deleteProductFromCart(id)
  }

  public setAmount(data: ProductAmountPayload): Observable<OrderI> {
    return this.cartApiService.setProductAmount(data);
  }
  public sendOrder(order: OrderDto, customerData: CustomerData): Observable<any> {
    return this.cartApiService.sendOrder(order, customerData)
  }

  public updateCart(order: OrderDto | null): void {
    this.cartValue$.next(order);
    this.cartStateService.updateCart(order);
  }

  public checkAvailabilityInCart(id: string): boolean {
    const cartIds = this.cartValue$.value?.list.map(orderProduct => orderProduct?.product?.id);
    const productInCart = (cartIds || []).includes(id);
    return productInCart;
  }

  public checkAvailabilityInCart$(id: string) {
    return this.cartValue$.pipe(map((res: OrderDto) => {
      const cartIds = res.list.map(orderProduct => orderProduct?.product?.id);
      const productInCart = (cartIds || []).includes(id);
      return of(productInCart)
    }))
  }
}
