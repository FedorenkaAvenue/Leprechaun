import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerData, OrderDto, ProductAmountPayload } from '@shared/models/products/order.model';
import { CardService } from '@shared/services/card/card/card.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPageComponent implements OnInit {
  public cartData$: Observable<OrderDto>;
 
  constructor(private readonly cardService: CardService) {
   
  }

  ngOnInit(): void {
    this.cartData$ = this.cardService.getCardValue();
  }

  public deleteFromCart(id: string): void {
    this.cardService
      .deleteProduct(id)
      .pipe(take(1))
      .subscribe((order: OrderDto) => {
        this.cardService.updateCard(order);
      });
  }

  public setProductAmount({ count: amount, id: order_item }): void {
    const data: ProductAmountPayload = {
      amount,
      order_item,
    };

    this.cardService
      .setAmount(data)
      .pipe(take(1))
      .subscribe((order: OrderDto) => {
        this.cardService.updateCard(order);
      });
  }

  public sendOrder(customerForm: any, order: any): void {
    const customerData: CustomerData = customerForm;
    const phone = customerData?.phone.replace(/[^0-9]/g, '');
    const customer = { ...customerData, phone };
    this.cardService.sendOrder(order, customer).subscribe((res) => {});
  }
}
