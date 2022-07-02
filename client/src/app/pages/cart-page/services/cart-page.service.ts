import { Injectable } from '@angular/core';
import { OrderDto, OrderI } from '@shared/models/products/order.model';
import { CartApiService } from '@shared/services/api_es/cart-api/cart-api.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class CartPageService {

  constructor(private readonly cartApiService: CartApiService) { }

  public getProducts(): Observable<OrderDto> {
    return this.cartApiService.getProducts()
  }

  public addToCart(id: string): Observable<OrderI> {
    return this.cartApiService.addProductToCart(id)
  }

  public deleteProduct(id: string): Observable<OrderI> {
    return this.cartApiService.deleteProductFromCart(id)
  }
}
