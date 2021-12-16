import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPageRoutingModule } from './card-page-routing.module';
import { CardPageComponent } from './components/card-page/card-page.component';
import { CardPageService } from './services/card-page.service';
import { CardItemComponent } from './components/card-item/card-item.component';
import { closeIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { CardApiService } from '@shared/services/api_es/card-api/card-api.service';


@NgModule({
  declarations: [
    CardPageComponent,
    CardItemComponent
  ],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    LeprachaunIconsModule,
  ],
  providers: [
    CardPageService,
    CardApiService
  ]
})
export class CardPageModule { 
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
       closeIcon
      ]);
  }
}
