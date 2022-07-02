import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { OrderCartItemDto } from '@shared/models';

@Component({
  selector: 'app-cart-items-list',
  templateUrl: './cart-items-list.component.html',
  styleUrls: ['./cart-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemsListComponent implements OnInit {

  @Input() cartList: Array<OrderCartItemDto>;
  @Output() delete = new EventEmitter<string>()
  @Output() setAmount = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  public deleteFromCart(id: string): void {
    this.delete.emit(id)
  }

  public setProductAmount(count: number, id: string): void {
    const data = {count, id}
    this.setAmount.emit(data)
  }

}
