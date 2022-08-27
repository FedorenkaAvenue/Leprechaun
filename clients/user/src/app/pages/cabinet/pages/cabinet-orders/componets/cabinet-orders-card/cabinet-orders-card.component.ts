import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderI } from '@shared/models';

@Component({
  selector: 'app-cabinet-orders-card',
  templateUrl: './cabinet-orders-card.component.html',
  styleUrls: ['./cabinet-orders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetOrdersCardComponent implements OnInit {


  @Input() order: OrderI;
  
  constructor() { }

  ngOnInit(): void {
  }

}
