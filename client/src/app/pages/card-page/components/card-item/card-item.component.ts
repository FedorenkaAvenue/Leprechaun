import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { OrderCardItemDto } from '@shared/models/products/order.model';


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent implements OnInit {

  @Input() product: OrderCardItemDto;
  @Output() delete = new EventEmitter<void>()
  @Output() setAmount = new EventEmitter<number>()
  public showAmountError: boolean
  constructor() { }


  ngOnInit(): void {
  }
  
  public deleteFromCard(): void {
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
