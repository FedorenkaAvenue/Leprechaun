import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitchComponent } from './language-switch.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LanguageSwitchComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LanguageSwitchComponent
  ]
})
export class LanguageSwitchModule { }
