import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurtainsDirective } from './curtains.directive';



@NgModule({
  declarations: [
    CurtainsDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurtainsDirective
  ]
})
export class CurtainsModule { }
