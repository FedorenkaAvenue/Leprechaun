import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LpchPhoneComponent } from './components/lpch-phone/lpch-phone.component';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LpchPhoneComponent,
    PhoneMaskDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LpchPhoneComponent,
    PhoneMaskDirective
  ]
})
export class LpchPhoneModule { }
