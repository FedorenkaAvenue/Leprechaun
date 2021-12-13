import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPreviewCardComponent } from './product-preview-card.component';
import { cartIcon, cartSelectedIcon, LeprachaunIconRegistryService, LeprachaunIconsModule } from '@shared/modules/leprachaun-icons';
import { RouterModule } from '@angular/router';
import { CurtainsDirective } from '@shared/directives/curtains/curtains.directive';
import { CurtainsModule } from '@shared/directives/curtains/curtains.module';



@NgModule({
  declarations: [
    ProductPreviewCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeprachaunIconsModule,
    CurtainsModule
  ],
  exports: [
    ProductPreviewCardComponent
  ]
})
export class ProductPreviewCardModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
        cartIcon,
        cartSelectedIcon
      ]);
  }
}
