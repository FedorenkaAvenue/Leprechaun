import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesPageRoutingModule } from './favorites-page-routing.module';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { FavoritesItemComponent } from './components/favorites-item/favorites-item.component';
import { FavoritesApiService } from '@shared/services/api_es/favorites-api/favorites-api.service';
import { FavoritesPageService } from './services/favorites-page.service';
import { closeIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';


@NgModule({
  declarations: [
    FavoritesPageComponent,
    FavoritesItemComponent
  ],
  imports: [
    CommonModule,
    FavoritesPageRoutingModule,
    LeprachaunIconsModule,
  ],
  providers: [
    FavoritesApiService,
    FavoritesPageService
  ]
})
export class FavoritesPageModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
       closeIcon
      ]);
  }
}
