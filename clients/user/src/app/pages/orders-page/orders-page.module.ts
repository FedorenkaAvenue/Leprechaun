import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersPageRoutingModule } from './orders-page-routing.module';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { OrderCardComponent } from './components/order-card/order-card.component';


@NgModule({
  declarations: [
    OrdersPageComponent,
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    OrdersPageRoutingModule
  ]
})
export class OrdersPageModule { }
