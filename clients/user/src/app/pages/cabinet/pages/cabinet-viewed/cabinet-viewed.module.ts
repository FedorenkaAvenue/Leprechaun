import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetViewedRoutingModule } from './cabinet-viewed-routing.module';
import { CabinetViewedComponent } from './components/cabinet-viewed.component';
import { CabinetViewedService } from './services/cabinet-viewed.service';
import { ProductCardModule } from '@shared/components/product-card/product-card.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CabinetViewedComponent
  ],
  imports: [
    CommonModule,
    CabinetViewedRoutingModule,
    ProductCardModule,
    TranslateModule.forChild(),
  ],
  providers: [CabinetViewedService]
})
export class CabinetViewedModule { }
