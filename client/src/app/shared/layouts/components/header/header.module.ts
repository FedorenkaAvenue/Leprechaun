import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LanguageSwitchModule } from '@shared/components/language-switch/language-switch.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LanguageSwitchModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
