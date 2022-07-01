import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { OrderCardItemDto } from '@shared/models';

@Component({
  selector: 'app-card-items-list',
  templateUrl: './card-items-list.component.html',
  styleUrls: ['./card-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemsListComponent implements OnInit {

  @Input() cartList: Array<OrderCardItemDto>;
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
