import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { OrderCartItemDto } from '@shared/models/products/order.model';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit {

  @Input() product: OrderCartItemDto;
  @Output() delete = new EventEmitter<void>()
  @Output() setAmount = new EventEmitter<number>()
  public showAmountError: boolean
  constructor() { }


  ngOnInit(): void {
  }
  
  public deleteFromCart(): void {
    this.delete.emit()
  }

  public setProductAmount(count: number): void {
    this.showAmountError = !count;
    if(!count) {
      return
    }
    this.setAmount.emit(count)
  }
}
