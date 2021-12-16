import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { CurtainsDirective } from '@shared/directives/curtains/curtains.directive';
import { RouterModule } from '@angular/router';
import { cartIcon, cartSelectedIcon, heartIcon, heartIconFilled, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { CurtainsModule } from '@shared/directives/curtains/curtains.module';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeprachaunIconsModule,
    CurtainsModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
        cartIcon,
        heartIcon,
        heartIconFilled,
        cartSelectedIcon
      ]);
  }
}
