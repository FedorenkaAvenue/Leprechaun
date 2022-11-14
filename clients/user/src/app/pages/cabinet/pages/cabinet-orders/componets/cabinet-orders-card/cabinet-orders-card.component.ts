import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderI } from '@shared/models';
import { ORDER_STATUS } from '@shared/static/order-status';
import { environment } from 'environments/environment.global';

@Component({
  selector: 'app-cabinet-orders-card',
  templateUrl: './cabinet-orders-card.component.html',
  styleUrls: ['./cabinet-orders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetOrdersCardComponent implements OnInit {

  public orderStatuses  = ORDER_STATUS;
  public isOpen = false;
  public currencySymbol = environment.currencySymbol
  @Input() order: OrderI;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  
  toogle() {
    this.isOpen = !this.isOpen;
  }

  resendOrder(): void {
    console.log('resend order');
  }

}
