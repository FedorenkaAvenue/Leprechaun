import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { OrderCardItemDto } from '@shared/models';

@Component({
  selector: 'app-card-items-list',
  templateUrl: './card-items-list.component.html',
  styleUrls: ['./card-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemsListComponent implements OnInit {

  @Input() cartList: Array<OrderCardItemDto>;
  

  constructor() { }

  ngOnInit(): void {
  }

}
