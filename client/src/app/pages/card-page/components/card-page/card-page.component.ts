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
  public cardData$: Observable<OrderDto>;
  userForm: FormGroup;
  constructor(private readonly cardService: CardService, private readonly fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.cardData$ = this.cardService.getCardValue();
  }

  public deleteFromCard(id: string): void {
    this.cardService
      .deleteProduct(id)
      .pipe(take(1))
      .subscribe((order: OrderDto) => {
        this.cardService.updateCard(order);
      });
  }

  private createForm() {
    this.userForm = this.fb.group({
      name: this.fb.control(null, [Validators?.required]),
      phone: this.fb.control('', [
        Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
        Validators.required,
      ]),
    });
  }

  public setProductAmount(amount: number, order_item: string): void {
    const data: ProductAmountPayload = {
      amount,
      order_item,
    };
    this.cardService.setAmount(data)
    .pipe(take(1))
    .subscribe((order: OrderDto) => {
      this.cardService.updateCard(order);
    });
  }

  public sendOrder(order: OrderDto): void {
    const customerData: CustomerData = this.userForm.value;
    const phone = +customerData?.phone.replace(/[^0-9]/g, '');
    const customer = { ...customerData, phone };
    this.cardService.sendOrder(order, customer).subscribe((res) => {});
  }
}
