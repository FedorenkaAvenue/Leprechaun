import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LanguageSwitchModule } from '@shared/components/language-switch/language-switch.module';
import { cartIcon, heartIcon, LeprachaunIconRegistryService, LeprachaunIconsModule, questionIcon } from '@shared/modules/leprachaun-icons';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LanguageSwitchModule,
    LeprachaunIconsModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
  constructor(private readonly leprachaunIconRegistryService: LeprachaunIconRegistryService) {
    this.leprachaunIconRegistryService.registerIcons(
      [
        questionIcon,
        heartIcon,
        cartIcon
      ]);
  }
}
