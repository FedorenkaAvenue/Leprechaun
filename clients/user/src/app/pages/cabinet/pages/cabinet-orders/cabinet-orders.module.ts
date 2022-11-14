import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetOrdersRoutingModule } from './cabinet-orders-routing.module';
import { CabinetOrdersComponent } from './componets/cabinet-orders/cabinet-orders.component';
import { CabinetOrdersCardComponent } from './componets/cabinet-orders-card/cabinet-orders-card.component';
import { CabinetOrdersService } from './services/cabinet-orders.service';
import { OrdersApiService } from '@shared/services/api_es/orders-api/orders-api.service';
import { OrderStatusIndicatorDirective } from './directives/order-status-indicator/order-status-indicator.directive';
import { LpchImageModule } from '@shared/components/lpch-image/lpch-image.module';
import { TranslateModule } from '@ngx-translate/core';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { chevronIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';


@NgModule({
  declarations: [
    CabinetOrdersComponent,
    CabinetOrdersCardComponent,
    OrderStatusIndicatorDirective,
    OrderStatusPipe
  ],
  imports: [
    CommonModule,
    CabinetOrdersRoutingModule,
    LpchImageModule,
    LeprachaunIconsModule,
    TranslateModule.forChild(),
  ],
  exports: [OrderStatusIndicatorDirective],
  providers: [
    CabinetOrdersService,
    OrdersApiService
  ]
})
export class CabinetOrdersModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
        chevronIcon
      ]);
  }
}
