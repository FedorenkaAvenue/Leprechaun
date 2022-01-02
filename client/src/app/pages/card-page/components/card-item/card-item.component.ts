import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OrderProductDto } from '@shared/models/products/order.model';


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent implements OnInit {

  @Input() product: OrderProductDto;
  @Output() delete = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }
  
  public deleteFromCard(): void {
    this.delete.emit()
  }
}
