import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerData, OrderDto, ProductAmountPayload } from '@shared/models/products/order.model';
import { CartService } from '@shared/services/cart/cart/cart.service';
import { LpchRouterService } from '@shared/services/router/lpch-router.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent implements OnInit {
  public cartData: OrderDto;
 
  constructor(
    private readonly cartService: CartService,
    private readonly lpchRouterService: LpchRouterService,
    private readonly cd: ChangeDetectorRef,

    ) {
   
  }

  ngOnInit(): void {
    this.cartService.getCartValue().subscribe(res => {
    this.cartData = res;
    this.cd.detectChanges()
    console.log(this.cartData);
    
    })
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
      this.lpchRouterService.navigateToOrderHistory();
    });
  }
}
