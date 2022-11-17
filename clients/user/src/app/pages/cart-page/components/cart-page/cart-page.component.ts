import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerData, OrderDto, ProductAmountPayload } from '@shared/models/products/order.model';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent implements OnInit {
  public cartData$: Observable<OrderDto>;
 
  constructor(private readonly cartService: CartService) {
   
  }

  ngOnInit(): void {
    this.cartData$ = this.cartService.getCartValue();
  }

  public deleteFromCart(id: string): void {
    this.cartService
      .deleteProduct(id)
      .pipe(take(1))
      .subscribe((order: OrderDto) => {
        this.cartService.updateCart(order);
      });
  }

  public setProductAmount({ count: amount, id: order_item }): void {
    const data: ProductAmountPayload = {
      amount,
      order_item,
    };

    this.cartService
      .setAmount(data)
      .pipe(take(1))
      .subscribe((order: OrderDto) => {
        this.cartService.updateCart(order);
      });
  }

  public sendOrder(customerForm: any, order: any): void {
    const customerData: CustomerData = customerForm;
    const phone = customerData?.phone.replace(/[^0-9]/g, '');
    const customer = { ...customerData, phone };
    this.cartService.sendOrder(order, customer).subscribe((res) => {
      this.cartService.updateCart(null);
    });
  }
}
