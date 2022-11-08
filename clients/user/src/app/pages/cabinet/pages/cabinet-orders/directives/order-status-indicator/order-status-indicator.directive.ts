import { Directive, HostBinding, Input } from '@angular/core';
import { OrderStatus } from '@shared/enums/order-status.enum';

@Directive({
  selector: '[appOrderStatusIndic]'
})
export class OrderStatusIndicatorDirective {

  @Input() appOrderStatusIndic: OrderStatus
  
  constructor() { }

  @HostBinding('style.background') get backgroundColor() {
    // if(this.appOrderStatusIndic === OrderStatus.INIT) return 'green';s
    if(this.appOrderStatusIndic === OrderStatus.CANCELED) return 'red';
    if(this.appOrderStatusIndic === OrderStatus.COMPLETED) return 'green';
    if(this.appOrderStatusIndic === OrderStatus.INIT) return 'blue';
    if(this.appOrderStatusIndic === OrderStatus.IN_PROCESS) return 'yellow';
    if(this.appOrderStatusIndic === OrderStatus.POSTED) return 'aqua';
  } 
}
