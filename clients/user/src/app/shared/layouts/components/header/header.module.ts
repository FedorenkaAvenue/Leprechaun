import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LanguageSwitchModule } from '@shared/components/language-switch/language-switch.module';
import { cartIcon, heartIcon, LeprachaunIconRegistryService, LeprachaunIconsModule, questionIcon } from '@shared/modules/leprachaun-icons';
import { LpchInputModule } from '@shared/controls/lpch-input/lpch-input.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LpchImageModule } from '@shared/components/lpch-image/lpch-image.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LanguageSwitchModule,
    LeprachaunIconsModule,
    LpchInputModule,
    RouterModule,
    TranslateModule.forChild(),
    LocalizeRouterModule,
    FormsModule,
    ReactiveFormsModule,
    LpchImageModule
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
