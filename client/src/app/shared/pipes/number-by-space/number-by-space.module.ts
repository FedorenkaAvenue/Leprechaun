import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberBySpacePipe } from './number-space.pipe';



@NgModule({
  declarations: [
    NumberBySpacePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberBySpacePipe
  ]
})
export class NumberBySpaceModule { }
